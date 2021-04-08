// This is your new function. To start, set the name and path on the left.

exports.payment_full =async function(context, event, callback) {
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
  
    Remember.repeat = false;
    
    Remember.payment_type = 1;
    Remember.task_fail_counter = 0;
   
     Remember.payment_amount = Memory.SIFAmount;
     Say = "You have selected to pay your full balance.";
    
    // This callback is what is returned in response to this function being invoked.
  const functions = Runtime.getFunctions();
  let path = functions['responseBuilder'].path;
  //console.log("path:"+path);
  let RB = require(path);
  await RB.responseBuilder(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  
    } catch (error) {  
    console.error(error);    
    callback( error);
  }
  };
  