 var database = firebase.database();

  var lastEmployee = 0;

  var employeeTable = $('#employeeData #table');

    // Get all the form fields!
    var getFormData = function(updateRemote){
        $('#addEmployeeData input').each(function(){
            // console.log("crap");
            if($(this).val().length){
                // console.log($(this).val());
                localDataObj[$(this).attr('id')] = $(this).val();
            }
        });
        return updateRemote(localDataObj);
    }

    var updateRemote = function(dataObj){
        database.ref('employees/' + getLastEmployee() ).set(dataObj);
    }

    var getLastEmployee = function(snapshot){
        console.log(snapshot);
        // debugger;
        // lastEmployee++;

        for (const key in snapshot) {
            if (snapshot.hasOwnProperty(key)) {
                const element = snapshot[key];
                console.log(key);
                lastEmployee = key;
            }
        }
        return lastEmployee++;
    }


    var printPaperPushers = function(paperPushers){
        employeeTable.html('');
        
        for (const employeeKey in paperPushers) {
            if (paperPushers.hasOwnProperty(employeeKey)) {
                const employee = paperPushers[employeeKey];
                employeeTable.append( printEmployee(employee) );
            }
        }

    }

    var printEmployee = function(employeeData){
        var row = $('<tr>');
        
        for (const prop in employeeData) {
            if (employeeData.hasOwnProperty(prop)) {
                const propVal = employeeData[prop];
                var col = $('<td>').attr({'id': 'emp' + prop}).text(propVal);
                row.append(col);
            }
        }

        return row;
    }

    // data holder
    var localDataObj = {};

    // on click event
    $('#addEmployee').on('click', function(event){
        event.preventDefault();
        
        getFormData(updateRemote);
    });

    // when we get data in the bucket
    database.ref('employees').on("value", function(snapshot){
        
        getLastEmployee(snapshot.val());
        
        printPaperPushers(snapshot.val());
    }, function(error){
        console.log(errors);
    });