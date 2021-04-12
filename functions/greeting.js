// This is your new function. To start, set the name and path on the left.

exports.greeting = async function (context, event, callback) {
  try {
    let Say;
    let Prompt;
    let Listen = false;
    let Collect = false;
    let Remember = {};
    let Tasks = false;
    let Redirect = false;
    let Handoff = false;

    const Memory = JSON.parse(event.Memory);

    Remember.task_fail_counter = 0;
    Remember.repeat = false;
    Remember.transfer_agent = false;
    Remember.question = "payment_full";
    // this update from VS code.
    // const payment_type = event.Field_payment_type_Value;

    let userTotalBalance = 800; // Default Amount for testing
    let SIFAmount = 200;

    if (Memory.userTotalBalance != undefined)
      userTotalBalance = Number(Memory.userTotalBalance).toFixed(2);

    if (Memory.SIFAmount != undefined)
      SIFAmount = Number(Memory.SIFAmount).toFixed(2);

    console.log("SIFAmount: " + SIFAmount);
    Remember.SIFAmount = SIFAmount;
    Remember.userTotalBalance = userTotalBalance;

    //Say = `you can pay your full balance of $${userTotalBalance}, or you can make a partial payment or you can make a payment arranagement. Let us know what would you prefer.`;
    //Redirect='task://payment_full';
    // Listen = true;
    // Tasks=['payment_Full'];

    if (Number(SIFAmount) > 0) {
      Say = `Will you pay the Reduced balance of $${SIFAmount} in full today?  Paying this amount will stop all further collection activity and the account will be closed for less than the full balance. Say Yes or No. You can also press 1 for yes and 2 for No`;

      Listen = {
        "voice_digits": {
          "num_digits": 1,
          "finish_on_key": "#",
          "redirects": {
            1: "task://payment_full",
            2: "task://arrangement_yes_no"
          }
        }
      };
    }
    else {
      Say = `Your payment amount is $${userTotalBalance}.`;
      Redirect = "task://agent_transfer";
    }

    //End of your code.

    // This callback is what is returned in response to this function being invoked.
    const functions = Runtime.getFunctions();
    let path = functions['responseBuilder'].path;
    //console.log("path:"+path);
    let RB = require(path);
    await RB.responseBuilder(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);

  } catch (error) {
    console.error(error);
    callback(error);
  }
};
