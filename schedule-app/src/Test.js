
import React,{ useEffect, useState } from 'react'


class Time_Bar extends React.Component {
   constructor(props) {
      super(props);
      this.state = {dx: ['none','none','none','none','none'],
                     jumong: [
                        [
                           {username: 'sharingan'}
                        ],
                        [
                           {'username': 'mangekyou'}
                        ],
                        [
                           {'username': 'chibakutensei'}
                        ]
                     ],
                  legolas: 'jumong'
                  }
    }
    min_date(){
      this.setState({
          legolas: this.state.legolas+'sharingan',
          jumong: [1,2,3,4,5]
         });
       console.log('jumong: '+this.state.legolas)
       return this.state.legolas
    }
    max_date(){
      this.setState({
          legolas: this.state.legolas+'chibakutensei'
         });
       console.log('Legolas: '+this.state.legolas)
    }
    mobius_date(){
      this.setState({
          legolas: this.state.legolas+'sentinelium'
         });
       console.log('Legolas: '+this.state.legolas)
    }
    componentDidMount() {
       //console.log('jumong: '+this.state.legolas[0].plus)
       this.max_date()
       this.min_date(this.state.legolas)
       this.mobius_date()
   }
 
   render() { 

  const setAllToFalse =(targetIndex)=>{
     const placeholder = this.state.dx
     console.log('placeholder:' +placeholder)
     console.log('targetIndex:' +targetIndex)
     placeholder.forEach((x, index)=>{
        if(index !== targetIndex){placeholder[index] = 'none'}
     })

     this.setState({
     dx: placeholder
    });

     console.log('dx in setAllFalse:' +this.state.dx)
  }

  const toggleContent =(index)=>{
   
     const placeholder = this.state.dx
     if(placeholder[index] === 'none'){placeholder[index] = 'flex'}
     //else placeholder[index] = 'none'
     this.setState({
      dx: placeholder
     });
     console.log('dx in toggleContent:' +this.state.dx)

     setAllToFalse(index)
  }

  return (
    <div style={{height: '1300px' , width: '700px' ,backgroundColor: 'yellow'}}>{this.state.legolas}

      <div style={{padding: '3px'}}>BOUNDING BOX A1 
         <div style={{height: '30px' , width: '700px' ,backgroundColor: 'GREEN'}}
         onClick={()=>toggleContent(0)}>
            HEADING A1
         </div>
         <div style={{height: '100px' , width: '700px' ,backgroundColor: 'BLUE', display:this.state.dx[0]}}>
            CONTENT A1
         </div>
      </div>
      <div style={{padding: '3px'}}>BOUNDING BOX A2 
         <div style={{height: '30px' , width: '700px' ,backgroundColor: 'GREEN'}}
         onClick={()=>toggleContent(1)}>
            HEADING A2
         </div>
         <div style={{height: '100px' , width: '700px' ,backgroundColor: 'RED', display:this.state.dx[1]}}>
            CONTENT A2
         </div>
      </div>
      <div style={{padding: '3px'}}>BOUNDING BOX A3
         <div style={{height: '30px' , width: '700px' ,backgroundColor: 'GREEN'}}
         onClick={()=>toggleContent(2)}>
            HEADING A3
         </div>
         <div style={{height: '100px' , width: '700px' ,backgroundColor: 'PURPLE', display:this.state.dx[2]}}>
            CONTENT A3
         </div>
      </div>

      <div style={{padding: '3px'}}>BOUNDING BOX B1 
         <div style={{height: '30px' , width: '700px' ,backgroundColor: 'ORANGE'}}>
            HEADING B1
         </div>
         <div style={{height: '100px' , width: '700px' ,backgroundColor: 'BLUE', display:this.state.dx[0]}}>
            CONTENT B1
         </div>
      </div>
      <div style={{padding: '3px'}}>BOUNDING BOX B2
         <div style={{height: '30px' , width: '700px' ,backgroundColor: 'ORANGE'}}>
            HEADING B2
         </div>
         <div style={{height: '100px' , width: '700px' ,backgroundColor: 'RED', display:this.state.dx[1]}}>
            CONTENT B2
         </div>
      </div>
      <div style={{padding: '3px'}}>BOUNDING BOX B3
         <div style={{height: '30px' , width: '700px' ,backgroundColor: 'ORANGE'}}>
            HEADING B3
         </div>
         <div style={{height: '100px' , width: '700px' ,backgroundColor: 'PURPLE', display:this.state.dx[2]}}>
            CONTENT B3
         </div>
      </div>
    </div>
  );
}
}
export default Time_Bar;


/* <!DOCTYPE html>
<html>
<style>
   body {
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
   }
   .dragDiv {
      position: absolute;
      z-index: 9;
      text-align: center;
      border: 1px solid #d3d3d3;
      padding: 30px;
      cursor: move;
      z-index: 10;
      background-color: rgb(108, 24, 177);
      color: #fff;
      font-size: 20px;
      font-weight: 500;
   }
</style>
<body>
<h1>Draggable DIV Element Example</h1>
<h2>Click and drag the below element to move it around</h2>
<div class="dragDiv">
This div can be moved around
</div>
<script>
   dragElement(document.querySelector(".dragDiv"));
   function dragElement(ele) {
      var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
      if (document.querySelector(ele.id + "header")) {
         document.getElementById(
            ele.id + "header"
         ).onmousedown = dragMouseDown;
      }
      else {
         ele.onmousedown = dragMouseDown;
      }
      function dragMouseDown(e) {
         e = e || window.event;
         e.preventDefault();
         pos3 = e.clientX;
         pos4 = e.clientY;
         document.onmouseup = closeDragElement;
         document.onmousemove = elementDrag;
      }
      function elementDrag(e) {
         e = e || window.event;
         e.preventDefault();
         pos1 = pos3 - e.clientX;
         pos2 = pos4 - e.clientY;
         pos3 = e.clientX;
         pos4 = e.clientY;
         ele.style.top = ele.offsetTop - pos2 + "px";
         ele.style.left = ele.offsetLeft - pos1 + "px";
      }
      function closeDragElement() {
         document.onmouseup = null;
         document.onmousemove = null;
      }
   }
</script>
</body>
</html> */
