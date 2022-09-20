window.alert = function() { throw("An alert called") }
const url = "https://internapp.vercel.app/drashti/todos/"
var pending = [], completed = []

class app
{
    constructor (url)
    {
        $.get(url,function(data)
        {   
            $("#addedtask").empty()
            $("#completedtask").empty()
            pending = []
            completed = []
            $.each(data,function(key,value)
            {
                if(value.completed){
                    completed.push(value)
                }else{
                    pending.push(value)
                }
            })
            newApp.pendingPrint()
            newApp.completedPrint()
        })
    }
    
    getTodo(url)
    {
        $("#change").hide()
        $.get(url,function(data)
        {    
            $("#addedtask").empty()
            $("#completedtask").empty()
            pending = []
            completed = []
            $.each(data,function(key,value)
            {
                if(value.completed){
                    completed.push(value)
                }else{
                    pending.push(value)
                }
            })
            newApp.pendingPrint()
            newApp.completedPrint()
        })
    }
    
    pendingPrint()
    {
        pending.forEach(value => 
            {
            var list = ""
            list +=`<div class='${value.id} design'>`
            list += `<div class= btwn>`
                list += `<input type="checkbox" id='${value.id}' style="cursor:pointer;" onclick="abc('${value.id}')" >`+ "&nbsp";
                list +=`<ul style="list-style : none;">`
                list += `<li style= "font-size :x-large;">`+`<b>`+value.title +`</b>`+ "&nbsp" +`</li>`;
                list += value.description + "&nbsp"+"&nbsp" ;
                list += `</ul>`;
                list +=`</div>`;
                list += `<div class="space">`
                list += `<i class="fas fa-edit" type="submit" id='${value.id}'style="cursor:pointer;" onclick="edit('${value.id}')">  </i>`;
                list += `<i class='fas fa-trash'type="submit" id='${value.id}' style="cursor:pointer;" onclick="del('${value.id}')"></i>`
                list +=`</div>`;
                list +=`</div>`;
                $("#addedtask").append(list)
            })
    }
    
    completedPrint()
    {
        completed.forEach(value => 
            {
            var list = ""
                list +=`<div class='${value.id} design'>`
                list += `<div class= btwn>`
                list += `<input type="checkbox" id='${value.id}'  style="cursor:pointer;" onclick="pqr('${value.id}')" checked >` + "&nbsp";
                list +=`<ul style="list-style : none;">`
                list +=`<li style= "font-size :x-large;">`+`<b>`+ value.title + `</b>`+ "&nbsp"  +`</li>`;
                list += value.description + "&nbsp"+ "&nbsp" ;
                list += `</ul>`;
                list +=`</div>`;
                list += `<div class="space">`
                list += `<i class="fas fa-edit" type="submit" style="cursor:pointer;" id='${value.id}' onclick="edit('${value.id}')" >  </i>`;
                list += `<i class='fas fa-trash'type="submit" id='${value.id}' style="cursor:pointer;" onclick="del('${value.id}')"></i>`
                list +=`</div>`;
                list +=`</div>`;
                $("#completedtask").append(list)
            })
    }
    
    post(url)
    {
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
                $("#change").hide();
                $("#lblError").hide();
                $("#error").hide();
                $("#addedtask").empty()
                $("#title").val('')
                $("#description").val('')
                $("#title").focus()
                newApp.getTodo(url)
                newApp.pendingPrint()
            }
              })
    
    }
    
    del(id)
    {   
        $.ajax
        ({
            url: url + id,
            type: 'DELETE',
            success:function()
            {
                newApp.getTodo(url)
                $("#title").val('')
                $("#description").val('')
                $("#change").hide()
                $("#add").show()
            }
        })
    }
    
    edit(id)
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
                        newApp.getTodo(url)
                        $("#add").show()
                        $("#addedtask").empty()
                        $("#title").val('')
                        $("#description").val('')
                        $("#title").focus()
                        newApp.pendingPrint()
                    }
                  })
        })
    }
    
    abc(id)
    {
        var data = {
            completed : true}
        $.ajax
            ({
                url : url + id,
                type : 'PUT', 
                data : JSON.stringify(data),
                contentType : "application/json",
                success: function(data)
                {
                    completed.push(data)
                    newApp.getTodo(url)
                }

            })
    }
    
    pqr(id)
    {
        var data = {
            completed : false
        }
        $.ajax
        ({
            url : url + id,
            type : 'PUT', 
            data : JSON.stringify(data),
            contentType : "application/json",
            success: function(data){
                pending.push(data)
                // console.log(data)
                newApp.getTodo(url)
            }
        })
    }
}

const newApp = new app(url)
$("#change").hide()

$("#add").click(function(e)
{
    e.preventDefault();
    var data = {
        title: $("#title").val(),
        description: $("#description").val(),
        completed : false
    }
    if(data.title === "" && data.description === "")
    {
        lblError.innerHTML= "title cannot be empty.";
        error.innerHTML= "description cannot be empty.";
    }
    else if(data.title === "")
    {
        lblError.innerHTML= "title cannot be empty.";
        error.innerHTML= "";
    }
    else if(data.description === "")
    {
        lblError.innerHTML= "";
        error.innerHTML= "description cannot be empty.";
    }
    else
    {
        $("#lblError").hide();
        $("#error").hide();
        newApp.post(url);
    }
})
function del(id)
{
    newApp.del(id)
}
function pqr(id)
{
    newApp.pqr(id)
}
function abc(id)
{
    newApp.abc(id)
}
function edit(id)
{
    newApp.edit(id)
}
