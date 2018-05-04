//Budget Controller
var budgetController = (function(){



})();
/////////////////////////////////////////////////////////////////////


//UI Controller
var UIController = (function() {

  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    addBtn: '.add__btn'
  }

  return {
    getInputValue: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value, // inc or exp
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value
      }
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
      if(event.keyCode === 13 || event.wich === 13){
        ctrlAddItem();
      };
    });
  };

  var ctrlAddItem = function() {

        // 1. Get the field input data
        var input = UIController.getInputValue();
        console.log(input);

        //2. Add the item to the budget Controller

        //3. add the item to the UI

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
