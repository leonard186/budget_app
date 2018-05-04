//Budget Controller
var budgetController = (function(){

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem : function(type, des, val) {
      var newItem, ID;
      //generate unique ID
      if(data.allItems[type].length > 0){
        ID = data.allItems[type][data.allItems[type].length -1].id + 1;
      } else {
        ID = 0;
      }

      //create new item based on type(inc or exp)
      if(type === 'exp') {
      newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }
      //Push input into data structure
      data.allItems[type].push(newItem);
      //return the new element
      return newItem;
    },

    testing: function() {
      console.log(data);
    }
  };

})();
/////////////////////////////////////////////////////////////////////


//UI Controller
var UIController = (function() {

  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    addBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  }

  return {
    getInputValue: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value, // inc or exp
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value
      }
    },

    addListItem:  function(obj, type) {
      var html, newHtml, element;
      //create html string with placeholder text
      if(type === 'inc') {
        element = DOMStrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div> '
      } else if(type === 'exp') {
        element = DOMStrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      };
      //replace the placehilder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);
      //insert html to the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    getDOMStrings: function() {
      return DOMStrings;
    }

  }

})();
/////////////////////////////////////////////////////////////////////


//Global App controller
var controller = (function(budgetCtrl, UICtrl){

  var handleEventListeners = function() {

    var DOM =  UICtrl.getDOMStrings();
    document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
      if(event.keyCode === 13 || event.which === 13){
        ctrlAddItem();
      };
    });
  };

  var ctrlAddItem = function() {
      var input, newItem;
        // 1. Get the field input data
        input = UIController.getInputValue();

        //2. Add the item to the budget Controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        console.log(newItem);
        //3. add the item to the UI
        UICtrl.addListItem(newItem, input.type);
        //4.Calculate the budget

        //5. Display the budget on the UI
  }

  return {
    init: function() {
      console.log('it works')
      handleEventListeners();
    }
  }

})(budgetController, UIController);
/////////////////////////////////////////////////////////////////////


controller.init();
