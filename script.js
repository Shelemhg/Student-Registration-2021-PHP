window.onload = function() {
    loadFile();
}


function CreateForm(form1){    
    form1 += `  <hr>
            <div class="field-container">
                <h4>
                    Student
                </h4>
                <label>
                    First Name
                </label>
                <input class="input-field" name="first_name" id="first_name">
            </div>
            <div>
                <label>
                    Last Name
                </label>
                <input class="input-field" name="last_name" id="last_name">
            </div>
            <div>
                <label>
                    Student ID
                </label>
                <input class="input-field" name="student_id" id="student_id">
            </div>`
    return form1;
}
function CreateForm2(form2){
    form2 +=`  
        <hr>
        <div class="field-container">
            <h4>
                Student 2
            </h4>
            <label>
                First Name
            </label>
            <input class="input-field"name="first_name_2" id="first_name_2">
        </div>
        <div>
            <label>
                Last Name
            </label>
            <input class="input-field"name="last_name_2" id="last_name_2">
        </div>
        <div>
            <label>
                Student ID
            </label>
            <input class="input-field"name="student_id_2" id="student_id_2">
        </div>`
    return form2;
}
function CreateGeneralForm(generalForm){
    generalForm += `  
            <div>
                <hr>
                <h4>Information</h4>
                <label>
                    Skill Level
                </label>
                <select name="skills" id="skills">
                    Skill Level
                    <option value=""  disabled selected hidden>
                    </option>
                    <option value="beginner">
                        Beginner
                    </option>
                    <option value="intermediate">
                        Intermediate
                    </option>
                    <option value="pre-advanced">
                        Pre-Advanced
                    </option>
                    <option value="advanced">
                        Advanced
                    </option>
                </select>
            </div>
            <div>
                <label>
                    Instrument
                </label>
                <select name="instrument" id="instrument_selected">
                    <option value=""  disabled selected hidden>
                    </option>
                    <option value="piano" class="instrument_selected">
                        Piano
                    </option>
                    <option value="voice" class="instrument_selected">
                        Voice
                    </option>
                    <option value="string" class="instrument_selected">
                        String
                    </option>
                    <option value="organ" class="instrument_selected">
                        Organ
                    </option>
                    <option value="other" class="instrument_selected">
                        Other
                    </option>
                </select>
            </div>
            <div>
                <label>
                    Location
                </label>
                <input type="text" name="location" id="location"></input>
            </div>
            <div>
                <label>
                    Room
                </label>
                <input type="number" name="room" id="room"></input>
            </div>
            <div>
                <label>
                    Time Slot
                </label>
                <input type="time" name="time" id="time"></input>
            </div>`

    return generalForm;
}
function GenerateForm(){
    let form1 = ''
    let form2 = ''
    let generalForm = ''
    
    form1 = CreateForm(form1);

    if (document.getElementById('duoRadial').checked) {
        form2 = CreateForm2(form2);
    }
    generalForm = CreateGeneralForm(generalForm);

    document.getElementById('forms_container').innerHTML = form1;
    document.getElementById('forms_2_container').innerHTML = form2;
    document.getElementById('general_info_container').innerHTML = generalForm;
}

function GetData(){
    let performance = document.getElementsByName("performance_type");
    for(i = 0; i < performance.length; i++) {
        if(performance[i].checked)
        performance = performance[i].value;
    }
    console.log("PERFORMANCE SAVED: " + performance);
    

    let first_name = document.getElementById("first_name").value;
    let last_name = document.getElementById("last_name").value;
    let student_id = document.getElementById("student_id").value;

    let skills = document.getElementById("skills").value;

    let instrument_selected = document.getElementById('instrument_selected').value;
    let location = document.getElementById("location").value;
    let room = document.getElementById("room").value;
    let time = document.getElementById("time").value;

    let data = new FormData();
    data.append('performance', performance);
    data.append('first_name', first_name);
    data.append('last_name', last_name);
    data.append('student_id', student_id);
    if(performance === 'Duo'){
        let first_name_2 = document.getElementById("first_name_2").value;
        let last_name_2 = document.getElementById("last_name_2").value;
        let student_id_2 = document.getElementById("student_id_2").value;
        data.append('first_name_2', first_name_2);
        data.append('last_name_2', last_name_2);
        data.append('student_id_2', student_id_2);
    }
    data.append('skills', skills);    
    data.append('instrument_selected', instrument_selected);
    data.append('location', location);
    data.append('room', room);
    data.append('time', time);
    console.log("PERFORMANCe " + performance)
    const errors = validateFields(data)
    errors.length === 0  
        ? SendData(data)
        : errors.forEach(e => document.getElementById("message_container").innerHTML += `<p>Please complete this field: ${e}</p>`)
}

const validateFields = (data) =>{
    const fieldsWithError = []
    for (let e of data.entries()){
        if(e[1] === '' || e[1] === null || e[1]=== ' ' ){
            fieldsWithError.push(e[0])
        }
    }
    return fieldsWithError
}

function SendData(data){
    alert('Se pasó a la función de envio')
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("message_container").innerHTML = "";
            document.getElementById("message_container").innerHTML = "Register done!";
            // console.log("RESPONSE: " + this.responseText);

            readFileJSON(this.responseText);

        } else if (this.readyState == 4) {
            document.getElementById("28 message_container").innerHTML = "";
            document.getElementById("29 message_container").innerHTML = "The url doesn't exist";
        }
      };

    xhr.open("POST", "assign13.php", true);
    xhr.send(data);
}


function readFileJSON(response) {
    if(response.length > 0){
        let filesJSON = JSON.parse(response);
        let lines = filesJSON.split('\n');
        // console.log("212 Lines after split: " + lines);
        let lineData = "";
        let data="";
        let words = "";

        for(var i = 0; i < lines.length - 1 ; i++){
            lineData= lines[i].trim();
            
            // console.log("220 Linedata after trim: " + lineData)
            let records = lineData.split(',');
            // console.log("222 Records after trim: " + records)
            for(var j = 0; j < records.length; j++){
                words =records[j];
                // console.log("225 words update: " + words)
                data +=words ;
                // console.log("227 Data update> " + words)

            
            }
            data+= " ";
        }
        records = "";
        data = data.split(' ');
        
        for(var i = 0; i < data.length - 1; i+=12){
                
                records += `
                <div class="record_container">
                    <p>
                        Performance: ${data[i]}
                    </p>
                    <p>
                        Name: ${data[i+1]}
                    </p>
                    <p>
                        Last Name: ${data[i+2]}
                    </p>
                    <p>
                        ID: ${data[i+3]}
                  </p>
                    `
            if(data[i+4]){
                records += `
                    <p>
                        Student 2:
                    </p>
                    <p>
                        First Name: ${data[i+4]}
                    </p>
                    <p>
                        Last Name: ${data[i+5]}
                    </p>
                    <p>
                        ID: ${data[i+6]}
                  </p>
                    `
            }
            records += `
                    <p>
                        Skills: ${data[i+7]}
                    </p>
                    <p>
                        Instrument: ${data[i+8]}
                    </p>
                    <p>
                        Location: ${data[i+9]}
                    </p>
                    <p>
                        Room: ${data[i+10]}
                    </p>
                    <p>
                        Time: ${data[i+11]}
                    </p><hr>
                    </div>
                    `
            
        };
        // console.log("302 records: " + records);
        document.getElementById("display_area").innerHTML = records;
        // console.log("DONE? records: " + records);
    }else{
        
        document.getElementById("display_area").innerHTML = "THERE ARE NOT STUDENTS REGISTERED"  
    }
}

function loadFile() {
    var xhr = new XMLHttpRequest();
    let formData = new FormData();

    formData.append('load', '1');

    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        
        console.log(this);
        document.getElementById("message_container").innerHTML = "";

        readFileJSON(this.responseText);

      } else if (this.readyState == 4) {
        document.getElementById("message_container").innerHTML = "The url doesn't exist";
      }
    };
    xhr.open("POST", "assign13.php", true);
    xhr.send(formData);
    console.log(formData)
  }