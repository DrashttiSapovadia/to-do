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
    // $(`.${id}`).remove()
    // $.get(url + id,function(data)
    // { 
    //     var list = "";
    //     list += `<div class='${data.id}' style="background-color : lightgrey; padding :4px; height :50px; border : 4px solid black">`
    //     list += `<input type="checkbox" onclick="abc('${data.id}')"> `+ "&nbsp";
    //     list += data.title + "&nbsp";
    //     list += data.description + "&nbsp"+ "&nbsp" ;
    //     list += `<i class="fas fa-edit" type="submit" id='${data.id}' onclick="edit('${data.id}')" class="no" style= ' margin-left :500px;'>  </i>`;
    //     list += `<i class='fas fa-trash' style= ' margin-left :500px;'  type="submit" id='${data.id}' class="no" onclick="del('${data.id}')"></i>`
    //     list +=`</div>`
    //     $("#addedtask").append(list)  
    // })   
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
    // $(`.${id}`).remove()
    // $.get(url + id,function(data)
    // { 
    //     var list = "";
    //     list +=`<div class='${data.id}' style="background-color : lightgrey; padding :4px; height :50px; border : 4px solid black" >`
    //     list += `<input type="checkbox" id='${data.id}' class="xyz" onclick="pqr('${data.id}')">`+ "&nbsp";
    //     list += data.title + "&nbsp";
    //     list += data.description + "&nbsp"+ "&nbsp" ;
    //     list += `<i class="fas fa-edit" type="submit" id='${data.id}' onclick="edit('${data.id}')" style= ' margin-left :500px;'>  </i>`;
    //     list += `<i class='fas fa-trash' style= ' margin-left :500px;'  type="submit" id='${data.id}' onclick="del('${data.id}')"></i>`
    //     list +=`</div>`
    //     $("#removed").append(list)  
    //     $(".xyz").prop("checked",true)    
    // })
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
        // },
        // console.log(pending),
        pendingPrint()
        completedPrint()
        // var list = "";
        // {   
        //     list +=`<div class='${value.id}' style="background-color : lightgrey; padding :4px; height :50px; border : 4px solid black" >`
        //     list += `<input type="checkbox" id='${value.id}'  class="o" onclick="abc('${value.id}')" >` + "&nbsp";
        //     list += value.title + "&nbsp";
        //     list += value.description + "&nbsp"+ "&nbsp" ;
        //     list += `<i class="fas fa-edit" type="submit" id='${value.id}' onclick="edit('${value.id}')" class="no" style= ' margin-left :500px;'>  </i>`;
        //     list += `<i class='fas fa-trash' style= ' margin-left :500px;'  type="submit" id='${value.id}' class="no" onclick="del('${value.id}')"></i>`
        //     list +=`</div>`;
        // });
            // $("#addedtask").append(list)
    })
}

function pendingPrint(){
    pending.forEach(value => {
        var list = ""
        list +=`<div class='${value.id}' style="background-color : lightgrey; padding :4px; height :50px; border : 4px solid black" >`
            list += `<input type="checkbox" id='${value.id}'  class="o" onclick="abc('${value.id}')" >` + "&nbsp";
            list += value.title + "&nbsp";
            list += value.description + "&nbsp"+ "&nbsp" ;
            list += `<i class="fas fa-edit" type="submit" id='${value.id}' onclick="edit('${value.id}')" class="no" style= ' margin-left :500px;'>  </i>`;
            list += `<i class='fas fa-trash' style= ' margin-left :500px;'  type="submit" id='${value.id}' class="no" onclick="del('${value.id}')"></i>`
            list +=`</div>`;
            $("#addedtask").append(list)
    })
}

function completedPrint(){
    completed.forEach(value => {
        var list = ""
        list +=`<div class='${value.id}' style="background-color : lightgrey; padding :4px; height :50px; border : 4px solid black" >`
            list += `<input type="checkbox" id='${value.id}'  class="o" onclick="pqr('${value.id}')" checked />` + "&nbsp";
            list += value.title + "&nbsp";
            list += value.description + "&nbsp"+ "&nbsp" ;
            list += `<i class="fas fa-edit" type="submit" id='${value.id}' onclick="edit('${value.id}')" class="no" style= ' margin-left :500px;'>  </i>`;
            list += `<i class='fas fa-trash' style= ' margin-left :500px;'  type="submit" id='${value.id}' class="no" onclick="del('${value.id}')"></i>`
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
            success: function(){
                $("#addedtask").empty()
                $("#title").val('')
                $("#description").val('')
                $("#title").focus()
                getTodo()
                completedPrint()
                pendingPrint()
            }
        })
    })
})