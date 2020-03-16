var test = {
  0: { source: 'opened', target: 'phone1', id: 'opened', name: "name1", left: '100px', top: '50px', type: 'basic' },
  1: { source: 'phone1', target: 'phone2', id: 'phone1', name: "name2", left: '400px', top: '50px', type: 'basic' },
  2: { source: 'phone1', target: 'inperson', id: 'phone2', name: "name3", left: '400px', top: '150px', type: 'basic' },
  3: { source: 'phone2', target: 'rejected', id: 'inperson', name: "name4", left: '100px', top: '100px', type: 'basic' },
  4: { source: '', target: '', id: 'rejected', name: "name5", left: '100px', top: '150px', type: 'basic' },
  5: { source: '', target: '', id: 'test', name: "name5", left: '100px', top: '200px', type: 'basic' },
  5: { source: '', target: '', id: 'test', name: "name5", left: '100px', top: '250px', type: 'basic' },
  5: { source: 'test1', target: 'phone2', id: 'test1', name: "name6", left: '100px', top: '1050px', type: 'basic' },
};

var newMass = []
var testMass = JSON.parse(localStorage.getItem('arrow'))

// localStorage.setItem('task', JSON.stringify(test));

var oldTask = JSON.parse(localStorage.getItem('task')) || [];



var element = document.getElementById('canvas')
for (var i in oldTask) {
  var elem = document.createElement('div');
  elem.className = 'w jtk-managed jtk-draggable jtk-droppable jtk-connected jtk-endpoint-anchor'
  elem.innerHTML = `
  <div class="delete_wrapper">
    <div class="delete" onclick="deleteTask(this)">
      <i class="fa fa-times" aria-hidden="true"></i>
    </div>
  </div>
  ` + oldTask[i].name + `
  <div class="ep" action="${oldTask[i].id}"></div>
  `
  elem.id = oldTask[i].id
  elem.style.left = oldTask[i].left
  elem.style.top = oldTask[i].top
  for (var j in oldTask[i]) {    
    // elem.setAttribute(j, oldTask[i][j]);
    elem.setAttribute('name', oldTask[i].name);
  }
  element.appendChild(elem);
}



function pushobject() {
  var newTask = {};
  var newArrow = {}
  let elements = document.querySelectorAll('div.w');
  for (var i = 0; i < elements.length; i++) {
    // console.log(parseInt(elements[i].style.top), 'test', elements[i].id, 'id')
    let newItem = {
      'top': elements[i].style.top,
      'left': elements[i].style.left,
      'id': elements[i].id,
      'name': elements[i].getAttribute('name'),
      'source': '',
      'target': '',
      'type': 'basic'
    }
    for (var j = 0; j < newMass.length; j++) {
      let test = {
        'source': newMass[j].source,
        'target': newMass[j].target
      }
      newArrow[j] = test
      if (elements[i].id == newMass[j].source) {
        let innersource = {
          'source': newMass[j].source,
          'target': newMass[j].target
        }
        Object.assign(newItem, innersource)
      }
    }
    newTask[i] = newItem;
  }
  // console.log(newTask, 'obj')
  // console.log(newArrow, 'newArrow')

  localStorage.setItem('task', JSON.stringify(newTask));
  localStorage.setItem('arrow', JSON.stringify(newArrow));
}

save.onclick = function () {
  pushobject()
  // console.log(newMass, 'newMass')
};


function deleteTask(e) {
  
  let applicant = e.parentNode.parentNode.id
  for (var i = 0; i < newMass.length; i++) {
    if (applicant == newMass[i].source || applicant == newMass[i].target) {
      newMass.splice(i, 1)
    }
  }
  document.getElementById(applicant).parentNode.removeChild(document.getElementById(applicant));
  document.getElementById('save').click()
  location.reload()  
}

