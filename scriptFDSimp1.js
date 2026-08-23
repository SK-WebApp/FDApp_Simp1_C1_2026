/* Define semantic keys and a storage wrapper for localStorage to avoid key collisions and provide a clear structure for storing and retrieving data. */
const STORAGE_PREFIX = "foodDrinkApp:v1:";

const STORAGE_KEYS = Object.freeze({
    itemName: "input1",
    itemType: "drink-food",

    drinkLevelValue: "input2",
    drinkLevelText: "input2T",

    foodLevelValue: "input3",
    foodLevelText: "input3T",

    chewBiteValue: "chewbite selection value",
    chewBiteText: "chewbite selection text",

    stickyValue: "sticky selection value",
    stickyText: "sticky selection text",

    consistencyValue: "consistency selection value",
    consistencyText: "consistency selection text",

    thickness1Value: "thickness1 selection value",
    thickness1Text: "thickness1 selection text",

    thickness2Value: "thickness2 selection value",
    thickness2Text: "thickness2 selection text",

    biteSizeValue: "size selection value",
    biteSizeText: "size selection text",

    chewDifficultyValue: "chew selection value",
    chewDifficultyText: "chew selection text",
});

const appStorage = {
    get(key) {
        return localStorage.getItem(STORAGE_PREFIX + key);
    },

    set(key, value) {
        localStorage.setItem(STORAGE_PREFIX + key, value);
    },

    remove(key) {
        localStorage.removeItem(STORAGE_PREFIX + key);
    },

    clear() {
        Object.keys(localStorage)
            .filter(key => key.startsWith(STORAGE_PREFIX))
            .forEach(key => localStorage.removeItem(key));
    },
};


function dfSelection() {
    let dfSelector = document.getElementById('drinkfood');
    // let imageElement = document.getElementById('imageFrame');
    let dfSelVal = true; 

    dfSelector.addEventListener('change', function() {
      let dfSelVal = this.value;
      console.log ('DF value: ' + dfSelVal);

      if (dfSelVal == "dl") { 
        showChoiceD(); 
        } 
      if (dfSelVal == "fl") {
        showChoiceF(); 
        }
    }
    );
}


function getInput() {
    /* This following works by grabing all 3 values from the form tag id and then retrieves individual values*/
    let inputT = document.getElementById("inputValue"); 
    if (inputT !== null) {
    console.log("inputT: " + inputT);

    let inputTName = inputT.name; 
        console.log("inputTName; " + inputTName);

        if (inputTName == "inputValue") {
         let ip1 = inputT.elements["itemname"]; 
         let ip1a = inputT.elements["drinkfood"];

         let ipVal1 = ip1.value;
         let ipVal1a = ip1a.value; 

            if (ipVal1.trim() === "") {
                alert("Please enter an item name.");
                ip1.focus();
                return;
            }

            if (ipVal1a === "") {
                alert("Please select drink or food.");
                ip1a.focus();
                return;
            }
         console.log ("input val1: " + ipVal1);
         console.log ("input val1a: " + ipVal1a);
        
         let ip2 = document.getElementById("drink");
         let ip3 = document.getElementById("food");
        //  console.log("ip2: " + ip2);
        //  console.log("ip3: " + ip3);
         let dLev = document.querySelector('[name="drinklevel"]');
         let fLev = document.querySelector('[name="foodlevel"]');
        //  console.log("dLev: " + dLev);
        //  console.log("fLev: " + fLev);

         let dLevVal = dLev.value;
         let fLevVal = fLev.value;
            // if (dLevVal.trim() === "") {
            //         alert("Please select a drink level.");
            //         dLev.focus();
            //         return;
            // }
            // if (fLevVal.trim() === "") {
            //         alert("Please select a food level.");
            //         fLev.focus();
            //         return;
            // }
            if (ipVal1a === "dl" && dLevVal === "") {
                alert("Please select a drink level.");
                dLev.focus();
                return;
                }

            if (ipVal1a === "fl" && fLevVal === "") {
                alert("Please select a food level.");
                fLev.focus();
                return;
                }

         appStorage.clear(); // clear everything first
         appStorage.set(STORAGE_KEYS.itemName, ipVal1);
         appStorage.set(STORAGE_KEYS.itemType, ipVal1a);

            if (!ip2.classList.contains("hidden")) {
                // let dLevVal = dLev.value;

                if (dLevVal !== "") {
                    // dropdown.focus();
                    console.log ("drink Selection value: " + dLevVal);
                    appStorage.set(STORAGE_KEYS.drinkLevelValue, dLevVal);
                    let dLevTxt = dLev.options[dLev.selectedIndex].text;
                    console.log ("input2 txt: " + dLevTxt);
                    appStorage.set(STORAGE_KEYS.drinkLevelText, dLevTxt);

                    fLev.required = false;
                    document.location.href = "index_FD3.html"; // change this to FD3 if selected drink 
                } else {
                    // nothing 
                }
            }
            if (ip2.classList.contains("hidden")) {
                dLev.required = false;
            }

            if (!ip3.classList.contains("hidden")) {
                // let fLevVal = fLev.value;

                if (fLevVal !== "") {
                    console.log ("food selection value: " + fLevVal);
                    appStorage.set(STORAGE_KEYS.foodLevelValue, fLevVal);
                    let fLevTxt = fLev.options[fLev.selectedIndex].text;
                    console.log ("input3 txt: " + fLevTxt);
                    appStorage.set(STORAGE_KEYS.foodLevelText, fLevTxt);

                    dLev.required = false;
                    document.location.href = "index_FD2.html";
                } else {
                    // do nothing 
                }
            } 
            if (ip3.classList.contains("hidden")) {
                fLev.required = false;
            }
        
        } else {
            // do nothing
        }
        
    } if (inputT == null){
        console.log("inputT: " + inputT); 
    }      
}

/* Grab input from FD2 html page */
function getInput2() {
    let inputT2 = document.getElementById("FD2"); 

    if (inputT2 !== null) {
        console.log("inputT2: " + inputT2);

        let selT2 = inputT2.elements["chewbite"]; 
        let selT2val = selT2.value;
        let selT2txt = selT2.options[selT2.selectedIndex].text; 

        if (selT2val === "") {
            alert("Please make a selection.");
            selT2.focus();
            return;
        }

        console.log ("selectedT2 element " + selT2);
        console.log ("selectedT2 value: " + selT2val);
        console.log ("selectedT2 text: " + selT2txt);

        appStorage.set(STORAGE_KEYS.chewBiteValue, selT2val);
        appStorage.set(STORAGE_KEYS.chewBiteText, selT2txt);

        let ipVal1a = appStorage.get(STORAGE_KEYS.itemType);
        console.log ("drink/food selection:" + ipVal1a);


        if (selT2val == "cb1") {
            document.location.href = "index_FD4.html";
        }
        if (selT2val == "cb2" && ipVal1a == "fl") {
            document.location.href = "index_FD6.html";
        } 
        else {
                // do nothing
        }     
    }
    if (inputT2 == null) {
        console.log("inputT2 null: " + inputT2);
    }

}


/* Grab input from FD3 html page */
function getInput3() {
    let inputT3 = document.getElementById("FD3"); 

    if (inputT3 !== null) {
        console.log("inputT3: " + inputT3);

        // let selT4 = inputT4.elements["cconsistency"]; 
        let selT3 = inputT3.elements.sticky;
        let selT3val = selT3.value;
        let selT3txt = selT3.options[selT3.selectedIndex].text; 

        if (selT3val === "") {
            alert("Please make a selection.");
            selT3.focus();
            return;
        }

        console.log ("selectedT3 element: " + selT3);
        console.log ("selectedT3 value: " + selT3val);
        console.log ("selectedT3 text: " + selT3txt);

        appStorage.set(STORAGE_KEYS.stickyValue, selT3val);
        appStorage.set(STORAGE_KEYS.stickyText, selT3txt);

        if (selT3val == "st1") {
            document.location.href = "index_FD5.html";
        }
        if (selT3val == "st2") {
            document.location.href = "index_FD6.html";
        } else {
                // do nothing
        }     
    }
    if (inputT3 == null) {
        console.log("inputT3 null: " + inputT3);
    }
}


/* Grab input from FD4 html page */
function getInput4() {
    let inputT4 = document.getElementById("FD4"); 

    if (inputT4 !== null) {
        console.log("inputT4: " + inputT4);

        // let selT4 = inputT4.elements["cconsistency"]; 
        let selT4 = inputT4.elements.consistency;
        let selT4val = selT4.value;
        let selT4txt = selT4.options[selT4.selectedIndex].text; 

        if (selT4val === "") {
            alert("Please make a selection.");
            selT4.focus();
            return;
        }

        console.log ("selectedT4 element: " + selT4);
        console.log ("selectedT4 value: " + selT4val);
        console.log ("selectedT4 text: " + selT4txt);

        appStorage.set(STORAGE_KEYS.consistencyValue, selT4val);
        appStorage.set(STORAGE_KEYS.consistencyText, selT4txt);

        if (selT4val == "c1") {
            document.location.href = "index_FD7.html";
        }
        if (selT4val == "c2") {
            document.location.href = "index_FD8.html";
        } else {
                // do nothing
        }     
    }
    if (inputT4 == null) {
        console.log("inputT4 null: " + inputT4);
    }
}

 /* Grab input from FD5 html page */

function getInput5() {
    let inputT5 = document.getElementById("FD5"); 

    if (inputT5 !== null) {
        console.log("inputT5: " + inputT5);

        let selT5 = inputT5.elements.thick1;
        let selT5val = selT5.value;
        let selT5txt = selT5.options[selT5.selectedIndex].text; 

        if (selT5val === "") {
            alert("Please make a selection.");
            selT5.focus();
            return;
        }

        console.log ("selectedT5 element: " + selT5);
        console.log ("selectedT5 value: " + selT5val);
        console.log ("selectedT5 text: " + selT5txt);

        appStorage.set(STORAGE_KEYS.thickness1Value, selT5val);
        appStorage.set(STORAGE_KEYS.thickness1Text, selT5txt);

        if (selT5val == "t11") {
            document.location.href = "index_FD90.html";
        }
        if (selT5val == "t12") {
            document.location.href = "index_FD91.html";
        } 
        if (selT5val == "t13") {
            document.location.href = "index_FD92.html";
        }   else {
                // do nothing
        }     
    }
    if (inputT5 == null) {
        console.log("inputT5 null: " + inputT5);
    }
}

 /* Grab input from FD6 html page */

function getInput6() {
    let inputT6 = document.getElementById("FD6"); 

    if (inputT6 !== null) {
        console.log("inputT6: " + inputT6);

        // let selT4 = inputT4.elements["cconsistency"]; 
        let selT6 = inputT6.elements.thick2;
        let selT6val = selT6.value;
        let selT6txt = selT6.options[selT6.selectedIndex].text; 

        if (selT6val === "") {
            alert("Please make a selection.");
            selT6.focus();
            return;
        }

        console.log ("selectedT6 element: " + selT6);
        console.log ("selectedT6 value: " + selT6val);
        console.log ("selectedT6 text: " + selT6txt);

        appStorage.set(STORAGE_KEYS.thickness2Value, selT6val);
        appStorage.set(STORAGE_KEYS.thickness2Text, selT6txt);

        if (selT6val == "t21") {
            document.location = "index_FD93.html";
        } 
        if (selT6val == "t22") {
            document.location = "index_FD94.html";
        }   else {
                // do nothing
        }     
    }
    if (inputT6 == null) {
        console.log("inputT6 null: " + inputT6);
    }
}

 /* Grab input from FD7 html page */
function getInput7() {
    let inputT7 = document.getElementById("FD7"); 

    if (inputT7 !== null) {
        console.log("inputT7: " + inputT7);

        // let selT4 = inputT4.elements["cconsistency"]; 
        let selT7 = inputT7.elements.size;
        let selT7val = selT7.value;
        let selT7txt = selT7.options[selT7.selectedIndex].text; 

        if (selT7val === "") {
            alert("Please make a selection.");
            selT7.focus();
            return;
        }

        console.log ("selectedT7 element: " + selT7);
        console.log ("selectedT7 value: " + selT7val);
        console.log ("selectedT7 text: " + selT7txt);

        appStorage.set(STORAGE_KEYS.biteSizeValue, selT7val);
        appStorage.set(STORAGE_KEYS.biteSizeText, selT7txt);

        if (selT7val == "s1") {
            document.location = "index_FD95.html";
        } 
        if (selT7val == "s2") {
            document.location = "index_FD96.html";
        }  else {
                // do nothing
        }     
    }
    if (inputT7 == null) {
        console.log("inputT7 null: " + inputT7);
    }
}


 /* Grab input from FD8 html page */
function getInput8() {
    let inputT8 = document.getElementById("FD8"); 

    if (inputT8 !== null) {
        console.log("inputT8: " + inputT8);

        let selT8 = inputT8.elements.chew;
        let selT8val = selT8.value;
        let selT8txt = selT8.options[selT8.selectedIndex].text; 

        if (selT8val === "") {
            alert("Please make a selection.");
            selT8.focus();
            return;
        }

        console.log ("selectedT8 element: " + selT8);
        console.log ("selectedT8 value: " + selT8val);
        console.log ("selectedT8 text: " + selT8txt);

        appStorage.set(STORAGE_KEYS.chewDifficultyValue, selT8val);
        appStorage.set(STORAGE_KEYS.chewDifficultyText, selT8txt);

        if (selT8val == "c1") {
            document.location = "index_FD97e.html";
        } 
        if (selT8val == "c2") {
            document.location = "index_FD97r.html";
        }    else {
                // do nothing
        }     
    }
    if (inputT8 == null) {
        console.log("input8 null: " + inputT8);
    }
}


function readStValues() {

    if (appStorage.get(STORAGE_KEYS.itemName) !== null) {
        let storedInput1 = appStorage.get(STORAGE_KEYS.itemName);
        document.getElementById("dispInput1").textContent = storedInput1;

        let storedInput1a = appStorage.get(STORAGE_KEYS.itemType);
        if (storedInput1a == "dl") {
            document.getElementById("inputType").textContent = "drink";
        }
        if (storedInput1a == "fl") {
            document.getElementById("inputType").textContent = "eat";
        }
    

        if (appStorage.get(STORAGE_KEYS.drinkLevelValue) !== null ) {
            let storedInput2 = appStorage.get(STORAGE_KEYS.drinkLevelValue);
            let storedInput4 = appStorage.get(STORAGE_KEYS.drinkLevelText);
            showDRec(); // unhide drink recommendation 

            document.getElementById("dispInput2").textContent = storedInput4;
        }
        if (appStorage.get(STORAGE_KEYS.foodLevelValue) !== null ) {
            let storedInput3 = appStorage.get(STORAGE_KEYS.foodLevelValue);
            let storedInput5 = appStorage.get(STORAGE_KEYS.foodLevelText);
            showFRec(); // unhide food recommendation 

            document.getElementById("dispInput3").textContent = storedInput5;
        }
        else {
            // do nothing 
        }
    } 

    if (appStorage.get(STORAGE_KEYS.chewBiteValue) !== null) {
        let storedInput6 = appStorage.get(STORAGE_KEYS.chewBiteValue);
        let storedInput7 = appStorage.get(STORAGE_KEYS.chewBiteText);
    }

    if (appStorage.get(STORAGE_KEYS.stickyValue) !== null) {
        let storedInput8 = appStorage.get(STORAGE_KEYS.stickyValue);
        let storedInput9 = appStorage.get(STORAGE_KEYS.stickyText);
    }

    if (appStorage.get(STORAGE_KEYS.consistencyValue) !== null) {
        let storedInput10 = appStorage.get(STORAGE_KEYS.consistencyValue);
        let storedInput11 = appStorage.get(STORAGE_KEYS.consistencyText);
    }

    if (appStorage.get(STORAGE_KEYS.thickness1Value) !== null) {
        let storedInput12 = appStorage.get(STORAGE_KEYS.thickness1Value);
        let storedInput13 = appStorage.get(STORAGE_KEYS.thickness1Text);

        console.log ('storedInputFD5 value : ' + storedInput12);

        descriptions (storedInput12);
        decisions (storedInput12);
    }

    if (appStorage.get(STORAGE_KEYS.thickness2Value) !== null) {
        let storedInput14 = appStorage.get(STORAGE_KEYS.thickness2Value);
        let storedInput15 = appStorage.get(STORAGE_KEYS.thickness2Text);

        console.log ('storedInputFD6 value : ' + storedInput14);

        descriptions (storedInput14);
        decisions (storedInput14);
        }
    
    if (appStorage.get(STORAGE_KEYS.biteSizeValue) !== null) {
        let storedInput16 = appStorage.get(STORAGE_KEYS.biteSizeValue);
        let storedInput17 = appStorage.get(STORAGE_KEYS.biteSizeText);

        console.log ('storedInputFD7 value : ' + storedInput16);

        descriptions (storedInput16);    
        decisions (storedInput16);
    }
        
    if (appStorage.get(STORAGE_KEYS.chewDifficultyValue) !== null) {
        let storedInput18 = appStorage.get(STORAGE_KEYS.chewDifficultyValue);
        let storedInput19 = appStorage.get(STORAGE_KEYS.chewDifficultyText);

        console.log ('storedInputFD8 value : ' + storedInput18);

        descriptions (storedInput18);
        decisions (storedInput18);
    }

    else {
        // do nothing 
        console.log ('no stored input value');
        return;
    }
            
}

// Provide an IDDSI level statement 
function descriptions() {
    // let descript = true; // Change this to test different cases

    let descript = document.getElementById("descriptions");

    if (descript !== null) {

        console.log ('descript sectino is not null on html');

        let storedInput12 = appStorage.get(STORAGE_KEYS.thickness1Value);
        let storedInput14 = appStorage.get(STORAGE_KEYS.thickness2Value);
        let storedInput16 = appStorage.get(STORAGE_KEYS.biteSizeValue);
        let storedInput18 = appStorage.get(STORAGE_KEYS.chewDifficultyValue);

        // set condition be storedinput value
        if (storedInput12 == "t11") {
            descript.innerHTML = "<p>Your item matches IDDSI 0 level.</p>";
        } 
        if (storedInput12 == "t12") {
            descript.innerHTML = "<p>Your item matches IDDSI 1 level.</p>";
        } 
        if (storedInput12 == "t13") {
            descript.innerHTML = "<p>Your item matches IDDSI 2 level.</p>";
        } 
        if (storedInput14 == "t21") {
            descript.innerHTML = "<p>Your item matches IDDSI 3 level.</p>";
        } 
        if (storedInput14 == "t22") {
            descript.innerHTML = "<p>Your item matches IDDSI 4 level.</p>";
        } 
        if (storedInput16 == "s1") {
            descript.innerHTML = "<p>Your item matches IDDSI 5 level.</p>";
        } 
        if (storedInput16 == "s2") {
            descript.innerHTML = "<p>Your item matches IDDSI 6 level.</p>";
        } 
        if (storedInput18 == "c1") {
            descript.innerHTML = "<p>Your item matches IDDSI 7 Easy to chew level.</p>";
        } 
        if (storedInput18 == "c2") {
            descript.innerHTML = "<p>Your item matches IDDSI 7 Regular level.</p>";
        }  
        else {
            //do nothing 
        }
    }
    if (descript == null) {
        console.log ('no description element in html');
        return;
    }
}

// Insert final decision statement 
function decisions() {
    let decisions = document.getElementById("decisions");;

    if (decisions !== null) {
        let storedVal1a = appStorage.get(STORAGE_KEYS.itemType);
        console.log ('drink or food selection :' + storedVal1a);
        let storedInput2 = appStorage.get(STORAGE_KEYS.drinkLevelValue);
        console.log ('storedInput2 value : ' + storedInput2);
        let storedInput3 = appStorage.get(STORAGE_KEYS.foodLevelValue);
        console.log ('storedInput3 value : ' + storedInput3);
        let storedInput12 = appStorage.get(STORAGE_KEYS.thickness1Value);
        let storedInput14 = appStorage.get(STORAGE_KEYS.thickness2Value);
        let storedInput16 = appStorage.get(STORAGE_KEYS.biteSizeValue);
        let storedInput18 = appStorage.get(STORAGE_KEYS.chewDifficultyValue);

        // IDDSI 0
        if (storedInput12 == "t11" && storedVal1a == "dl") {
            if (storedInput2 == "dl0" ) {
            decisions.innerHTML = "<p>You can drink this!</p>";
            } 
            if (["dl1", "dl2", "dl3", "dl4"].includes(storedInput2)) {
            decisions.innerHTML = "<p>Sorry, you can't drink this! Need modifications.</p>";   
            }  
            if (storedInput2 == "dln") {
            decisions.innerHTML = "<p>Please consult with your SLP.</p>";   
            } else {
                // do nothing 
            }
        } 

        // IDDSI 1
        if (storedInput12 == "t12" && storedVal1a == "dl") {
            if (["dl0", "dl1"].includes(storedInput2)) {
            decisions.innerHTML = "<p>You can drink this!</p>";
            } 
            if (["dl2", "dl3", "dl4"].includes(storedInput2)) {
            decisions.innerHTML = "<p>Sorry, you can't drink this! Need modifications.</p>";   
            }  
            if (storedInput2 == "dln") {
            decisions.innerHTML = "<p>Please consult with your SLP.</p>";   
            } else {
                // do nothing 
            }
        }

        // IDDSI 2
        if (storedInput12 == "t13" && storedVal1a == "dl") {
            if (["dl0", "dl1", "dl2"].includes(storedInput2)) {
            decisions.innerHTML = "<p>You can drink this!</p>";
            }
            if (["dl3", "dl4"].includes(storedInput2)) {
            decisions.innerHTML = "<p>Sorry, you can't drink this! Need modifications.</p>";
            } 
            if (["dln"].includes(storedInput2)) {
            decisions.innerHTML = "<p>Please consult with your SLP.</p>";   
            } else {
                // do nothing 
            }
        }
        // IDDSI 3 drink 
        if (storedInput14 == "t21" && storedVal1a == "dl") {
            if (["dl0", "dl1", "dl2", "dl3"].includes(storedInput2)) {
                decisions.innerHTML = "<p>You can drink this!</p>";
            }
            if (["dl4"].includes(storedInput2)){
                decisions.innerHTML = "<p>Sorry, you can't drink can this!.</p>";
            }
            if (storedInput2 == "dln"){
                decisions.innerHTML = "<p>Please consult with your SLP.</p>";   
            } 
            else {
                // do nothing 
            }
        }
        // IDDSI 3 Food
        if (storedInput14 == "t21" && storedVal1a == "fl") {
            console.log ("storedInput 14 and storedVal1a value: " + storedInput14 + storedVal1a);
             if (["fl3", "fl4", "fl5", "fl6", "fl7e", "fl7r"].includes(storedInput3)) {
                decisions.innerHTML = "<p>You can eat this!</p>";
            }
            // if (["fl4, fl5, fl6, fl7e, fl7r"].includes(storedInput3)){
            //     console.log ('storedInput 14 and fl4');
            //     decisions.innerHTML = "<p>Sorry, you can't eat/drink can this!.</p>";
            // }
            if (storedInput3 == "fln"){
                decisions.innerHTML = "<p>Please consult with your SLP.</p>";   
            } 
            else {
                // do nothing 
            }
        }
        // IDDSI 4 drink 
        if (storedInput14 == "t22" && storedVal1a == "dl") {
            if (["dl0", "dl1", "dl2", "dl3", "dl4"].includes(storedInput2)) {
                decisions.innerHTML = "<p>You can drink this!</p>";
            }
            if (storedInput2 == "dln") {
                decisions.innerHTML = "<p>Please consult with your SLP.</p>";   
            } 
            else {
                // do nothing 
            }
        }
        // IDDSI 4 food
        if (storedInput14 == "t22" && storedVal1a == "fl") {
            if (["fl4", "fl5", "fl6", "fl7e", "fl7r"].includes(storedInput3)) {
                decisions.innerHTML = "<p>You can eat this!</p>";
            }
            if (storedInput3 == "fl3") {
                decisions.innerHTML = "<p>Sorry, you can't eat can this!.</p>";
            }
            if (storedInput3 == "fln") {
                decisions.innerHTML = "<p>Please consult with your SLP.</p>";   
            } 
            else {
                // do nothing 
            }
        }

        // IDDSI 5
        if (storedInput16 == "s1") {
            if (["fl5","fl6", "fl7e","fl7r"].includes(storedInput3)) {
            decisions.innerHTML = "<p>You can eat this!</p>";
            }
            if (["fl3", "fl4"].includes(storedInput3)) {
            decisions.innerHTML = "<p>Sorry, you can't eat this! Need modifications.</p>";   
            }
            if (storedInput3 == "fln"){
            decisions.innerHTML = "<p>Please consult with your SLP.</p>";   
            } 
            else {
                // do nothing 
            }
        }

        // IDDSI 6
        if (storedInput16 == "s2") {
            if (["fl6", "fl7e", "fl7r"].includes(storedInput3)) {
            decisions.innerHTML = "<p>You can eat this!</p>";
            }
            if (["fl3", "fl4", "fl5"].includes(storedInput3)) {
            decisions.innerHTML = "<p>Sorry, you can't eat this! Need modifications.</p>";   
            }
            if (storedInput3 == "fln"){
            decisions.innerHTML = "<p>Please consult with your SLP.</p>";   
            } 
            else {
                // do nothing 
            }  
        }
        // IDDSI 7e and 7f
        if (storedInput18 == "c1") {
            if (["fl7e", "fl7r"].includes(storedInput3)) {
            decisions.innerHTML = "<p>You can eat this!</p>";
            }
            if (["fl3", "fl4", "fl5", "fl6"].includes(storedInput3)) {
            decisions.innerHTML = "<p>Sorry, you can't eat this! Need modifications.</p>";   
            }
            if (storedInput3 == "fln"){
            decisions.innerHTML = "<p>Please consult with your SLP.</p>";   
            } 
            else {
                // do nothing 
            }            
        }   
        if (storedInput18 == "c2") {
            if (["fl7r"].includes(storedInput3)) {
            decisions.innerHTML = "<p>You can eat this!</p>";
            }
            if (["fl3", "fl4", "fl5", "fl6", "fl7e"].includes(storedInput3)) {
            decisions.innerHTML = "<p>Sorry, you can't eat this! Need modifications.</p>";   
            }
            if (storedInput3 == "fln"){
            decisions.innerHTML = "<p>Please consult with your SLP.</p>";   
            } 
            else {
                // do nothing 
            }  
        } 
        else {
            //do nothing 
        }
    }   
    if (decisions == null) {
        console.log ('no decisions element in html');
        return;
    }
}

function videoDemo() { 

    let videos = document.getElementById("videos");
    console.log ('get to video sectino: ' + videos);

    if (videos !== null) {

        console.log ('the videos section is not null on html');

    let storedInput12 = appStorage.get(STORAGE_KEYS.thickness1Value);
    let storedInput14 = appStorage.get(STORAGE_KEYS.thickness2Value);
    let storedInput16 = appStorage.get(STORAGE_KEYS.biteSizeValue);
    let storedInput18 = appStorage.get(STORAGE_KEYS.chewDifficultyValue);

    let videoFrame = document.getElementById("videoFrame");
        if (storedInput12 == "t11") {
            showVideo();
            videoFrame.src = "https://www.youtube.com/embed/j100JEKGKG0?si=kxur_E-tviYAleFb";
            } 
        if (storedInput12== "t12") {
            showVideo();
            videoFrame.src = "https://www.youtube.com/embed/lHjjVvHrTNQ?si=46sk__PPnBgmOnxI";
        }
        if (storedInput12 == "t13") {
            showVideo();
            videoFrame.src = "https://www.youtube.com/embed/-dCGsu8n26E?si=cup6kYM6BFJbBfF3";
        }
        if (storedInput14 == "t21") {
            showVideo();
            videoFrame.src = "https://www.youtube.com/embed/-iomYBGwo1I?si=x4aSOqyu-g1teJp2";
        } 
        if (storedInput14 == "t22") {
            showVideo();
            videoFrame.src = "https://www.youtube.com/embed/T6fgFlzahoE?si=RnGEgvGPz8fPh4qi";
        } 
        if (storedInput16 == "s1") {
            showVideo();
            videoFrame.src = "https://www.youtube.com/embed/dGy51RUbrdo?si=bpjEzOLz5dw-4P0P";
        } 
        if (storedInput16 == "s2") {
            showVideo();
            videoFrame.src = "https://www.youtube.com/embed/bngfYnnOAKo?si=4R3TNQ06bcF_FrNX";
        } 
        if (storedInput18 == "c1") {
            showVideo();
            videoFrame.src = "https://www.youtube.com/embed/vzdoFcwpqX0?si=QafjJEGTntN7zIn3&start=16";
        } 
        if (storedInput18 == "c2") {
            showVideo();
            videoFrame.src = "https://www.youtube.com/embed/vzdoFcwpqX0?si=QafjJEGTntN7zIn3&start=0&end=16";
        }  
        else {
            // do nothing 
        }
    }
    if (videos == null) {
        console.log ('no videos demo section in html');
        return;
    }
}


function showVideo() {
    let vidFrame = document.getElementById("videoFrame");
    vidFrame.classList.remove("hidden");
    vidFrame.classList.add("visible");
}

function showChoiceD() {
    let dfSel = document.getElementById("DF");
    dfSel.classList.remove("hidden");
    // dfSel.classList.add("visible");
    let dSel = document.getElementById("drink");
    dSel.classList.remove("hidden");
    // dSel.classList.add("visible");
    let fSel = document.getElementById("food");
    fSel.classList.add("hidden");
}

function showChoiceF() {
    let dfSel = document.getElementById("DF");
    dfSel.classList.remove("hidden");
    // dfSel.classList.add("visible");
    let fSel = document.getElementById("food");
    fSel.classList.remove("hidden");
    // fSel.classList.add("visible");
    let dSel = document.getElementById("drink");
    dSel.classList.add("hidden");
}

function showDRec() {
    let dSel = document.getElementById("drink");
    dSel.classList.remove("hidden");
    dSel.classList.add("visible");
}

function showFRec() {
    let fSel = document.getElementById("food");
    fSel.classList.remove("hidden");
    fSel.classList.add("visible");
}

function defaultImg() {
    let imageElement = document.getElementById('imageFrame');
    imageElement.src = `image/default.jpeg`;
    console.log ('default image function executed');
}

function reLoad() {
  if (sessionStorage.getItem("reloadPage") === "true") {
    console.log ('reload page is true');
    sessionStorage.removeItem("reloadPage");
    location.reload();
  }
  if (sessionStorage.getItem("reloadPage") === "false") { 
    // do nothing
    console.log ('reload page is false');
    return;
  }
}

function goHome() {
    document.location = "index.html";
}

function goBack() {
  sessionStorage.setItem("reloadPage", "true");
  history.back();
}

function imageDisplay2(){ 
    let imageSelector = document.getElementById('chewbite');
    let imageElement = document.getElementById('imageFrame');
    let selectedImage = true; 

    imageSelector.addEventListener('change', function() {
      let selectedImage = this.value;
      console.log ('this value: ' + selectedImage);

      if (selectedImage == "cb1") { 
        imageElement.src = `image/greencheck.jpeg`;
        } 
      if (selectedImage == "cb2") {
        imageElement.src = `image/redx.jpeg`;
      }
      if (selectedImage == "") {
        imageElement.src = `image/default.jpeg`;
      }  else {
        // do nothing 
      }
     }
    );
}

function imageDisplay3(){
    let imageSelector = document.getElementById('sticky');
    let imageElement = document.getElementById('imageFrame');
    let selectedImage = true; 

    imageSelector.addEventListener('change', function() {
      let selectedImage = this.value;
      console.log ('this value: ' + selectedImage)
      if (selectedImage == "st1") { 
        imageElement.src = `image/fallsfork1.jpeg`;
        } 
      if (selectedImage == "st2") {
        imageElement.src = `image/staysfork.jpeg`;
      } 
      if (selectedImage == "") {
        imageElement.src = `image/default.jpeg`;
      } else {
        // do nothing 
      }
     }
    );
}

function imageDisplay4(){
    let imageSelector = document.getElementById('consistency');
    let imageElement = document.getElementById('imageFrame');
    let selectedImage = true; 

    imageSelector.addEventListener('change', function() {
      let selectedImage = this.value;
      console.log ('this value: ' + selectedImage)
      if (selectedImage == "c1") { 
        imageElement.src = `image/oneconst.jpeg`;
        } 
      if (selectedImage == "c2") {
        imageElement.src = `image/mixconst.jpeg`;
      }
      if (selectedImage == "") {
        imageElement.src = `image/default.jpeg`;
      } else {
        // do nothing 
      }
     }
    );
}

function imageDisplay5(){ 
    let imageSelector = document.getElementById('thick1');
    let imageElement = document.getElementById('imageFrame');
    let selectedImage = true; 

    imageSelector.addEventListener('change', function() {
      let selectedImage = this.value;
      console.log ('this value: ' + selectedImage)
      if (selectedImage == "t11") { 
        imageElement.src = `image/water.jpeg`;
        } 
      if (selectedImage == "t12") {
        imageElement.src = `image/babyformula.jpeg`;
      }
      if (selectedImage == "t13") {
        imageElement.src = `image/milkshake.jpeg`;
      }
      else {
        // do nothing 
      }
     }
    );
}

function imageDisplay6(){ 
    let imageSelector = document.getElementById('thick2');
    let imageElement = document.getElementById('imageFrame');
    let selectedImage = true; 

    imageSelector.addEventListener('change', function() {
      let selectedImage = this.value;
      console.log ('this value: ' + selectedImage)
      if (selectedImage == "t21") { 
        imageElement.src = `image/slowdrip.jpeg`;
        } 
      if (selectedImage == "t22") {
        imageElement.src = `image/mound.jpeg`;
      }       
      if (selectedImage == "") {
        imageElement.src = `image/default.jpeg`;
      } else {
        // do nothing 
      }
     }
    );
}

function imageDisplay7(){ 
    let imageSelector = document.getElementById('size');
    let imageElement = document.getElementById('imageFrame');
    let selectedImage = true; 

    imageSelector.addEventListener('change', function() {
      let selectedImage = this.value;
      console.log ('this value: ' + selectedImage)
      if (selectedImage == "s1") { 
        imageElement.src = `image/ID5.jpeg`;
        } 
      if (selectedImage == "s2") {
        imageElement.src = `image/ID6.jpeg`;
      }       
      if (selectedImage == "") {
        imageElement.src = `image/default.jpeg`;
      } else {
        // do nothing 
      }
     }
    );
}

function imageDisplay8(){ 
    let imageSelector = document.getElementById('chew');
    let imageElement = document.getElementById('imageFrame');
    let selectedImage = true; 

    imageSelector.addEventListener('change', function() {
      let selectedImage = this.value;
      console.log ('this value: ' + selectedImage)
      if (selectedImage == "c1") { 
        imageElement.src = `image/easychew.jpeg`;
        } 
      if (selectedImage == "c2") {
        imageElement.src = `image/regchew.jpeg`;
      }       
      if (selectedImage == "") {
        imageElement.src = `image/default.jpeg`;
      } else {
        // do nothing 
      }
     }
    );
}





  
  
