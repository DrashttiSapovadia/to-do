const url = "https://internapp.vercel.app/drashti/todos/"
var pending = [], completed = []
function randomID()
{
    return Math.floor(Math.random() * 1000)
}
function pqr(id)
{
    var data = {
        completed : false
    }
    $.ajax({
        url : url + id,
        type : 'PUT', 
        data : JSON.stringify(data),
        contentType : "application/json",
        success: function(data){
            pending.push(data)
            // console.log(data)
            getTodo()
        }

    })
}
function abc(id)
{
    var data = {
        completed : true
    }
    $.ajax({
        url : url + id,
        type : 'PUT', 
        data : JSON.stringify(data),
        contentType : "application/json",
        success: function(data){
            completed.push(data)
            // console.log(data)
            getTodo()
        }

    })
}

function edit(id)
{
    $("#add").hide()
    $("#change").show()
    $.get(url + id,function(data)
    {
        $("#title").val(data.title)
        $("#description").val(data.description)
    })
    $("#change").click(function()
    {
        var data = {
            title: $("#title").val(),
            description: $("#description").val(),
        }
        $.ajax({url : url + id,
                type : 'PUT', 
                data : JSON.stringify(data),
                contentType : "application/json",
                success:function()
                
        {
            getTodo()
        }
              })
    })
}

function del(id)
{   
    $.ajax
    ({
        url: url + id,
        type: 'DELETE',
        success:function()
        {
            getTodo()
            $("#title").val('')
            $("#description").val('')
            $("#change").hide()
            $("#add").show()

        }
    })
}
function getTodo(id){
   

    $.get(url,function(data)
    {    $("#addedtask").empty()
    $("#completedtask").empty()
        pending = []
        completed = []
        $.each(data,function(key,value){
            if(value.completed){
                completed.push(value)
            }else{
                pending.push(value)
            }
            
        })
        pendingPrint()
        completedPrint()
       
    })
}

function pendingPrint(){
    pending.forEach(value => {
        var list = ""
        list +=`<div class='${value.id} design'>`
        list += `<div class= btwn>`
            list += `<input type="checkbox" id='${value.id}'  class="o" onclick="abc('${value.id}')" >`+ "&nbsp";
            list +=`<ul style="list-style : none;">`
            list += `<li style= "font-size :larger;">`+`<b>`+value.title +`</b>`+ "&nbsp" +`</li>`;
            list += value.description + "&nbsp"+"&nbsp" ;
            list += `</ul>`;
            list +=`</div>`;
            list += `<div class="space">`
            list += `<i class="fas fa-edit" type="submit" id='${value.id}' onclick="edit('${value.id}')" class="no">  </i>`;
            list += `<i class='fas fa-trash'type="submit" id='${value.id}' class="no" onclick="del('${value.id}')"></i>`
            list +=`</div>`;
            list +=`</div>`;
            $("#addedtask").append(list)
    })
}

function completedPrint(){
    completed.forEach(value => {
        var list = ""
            list +=`<div class='${value.id} design'>`
            list += `<div class= btwn>`
            list += `<input type="checkbox" id='${value.id}'  class="o" onclick="pqr('${value.id}')" checked >` + "&nbsp";
            list +=`<ul style="list-style : none;">`
            list +=`<li style= "font-size :larger;">`+`<b>`+ value.title + `</b>`+ "&nbsp"  +`</li>`;
            list += value.description + "&nbsp"+ "&nbsp" ;
            list += `</ul>`;
            list +=`</div>`;
            list += `<div class="space">`
            list += `<i class="fas fa-edit" type="submit" id='${value.id}' onclick="edit('${value.id}')" class="no">  </i>`;
            list += `<i class='fas fa-trash'type="submit" id='${value.id}' class="no" onclick="del('${value.id}')"></i>`
            list +=`</div>`;
            list +=`</div>`;
            $("#completedtask").append(list)
    })
}


$(document).ready(function()    
{   
    $("#change").hide()
    getTodo();
    $("#add").click(function(e)
    {
        e.preventDefault()
        var data = {
            title: $("#title").val(),
            description: $("#description").val(),
            completed : false
        }
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function()
            {
                $("#addedtask").empty()
                $("#title").val('')
                $("#description").val('')
                $("#title").focus()
                getTodo()
                pendingPrint()
            }
        })
    })
})