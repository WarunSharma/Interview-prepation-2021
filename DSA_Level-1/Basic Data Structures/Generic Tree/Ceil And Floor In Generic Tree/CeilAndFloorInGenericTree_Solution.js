class Stack{
    constructor(){
        this.arr=[];
    }

    push(ch){
        this.arr.push(ch);
    }

    pop(){
        this.arr.pop();
    }

    size(){
        return this.arr.length;
    }

    peek(){
        return this.arr[this.arr.length-1];
    }
}

class Node{
    data;
    children=new Array();
}

function display(root){
    process.stdout.write(root.data+" -> ");
    
    let str="";
    for(let child of root.children){
        str+=child.data+",";
    }
    process.stdout.write(str);
    console.log();

    for(let child of root.children){
        display(child);
    }

}

function construct(arr){
    let root;
    let st=new Stack();
    for(let a of arr){
        if(a==-1){
            st.pop();
        }
        else{
            let node=new Node();
            node.data=a;
            if(st.size()>0){
                st.peek().children.push(node);
            }
            else{
                root=node;
            }
            st.push(node);
        }
    }

    return root;
}

function sizeOfGenericTree(node){
    let size=1;

    for(let child of node.children){
        size+=sizeOfGenericTree(child);
    }

    return size;
}

function maximum(node){
    let max=node.data;

    for(let child of node.children){
        max=Math.max(maximum(child),max);
    }

    return max;
}

function height(node){
    let h=-1;

    for(let child of node.children){
        h=Math.max(height(child),h);
    }

    return h+1;
}

let ceil=Number.MAX_SAFE_INTEGER;
let floor=Number.MIN_SAFE_INTEGER;

function ceilAndFloor(node,data){
    if(node.data>data){
        if(node.data<ceil){
            ceil=node.data;
        }        
    }

    if(node.data<data){
        if(node.data>floor){
            floor=node.data;
        }
    }

    for(let child of node.children){
        ceilAndFloor(child,data);
    }
}

let root=construct([10, 20, 50, -1, 60, -1, -1, 30, 70, -1, 80, 110, -1, 120, -1, -1, 90, -1, -1, 40, 100, -1, -1, -1]);
// display(root);
//console.log(sizeOfGenericTree(root));
//console.log(maximum(root));
// console.log(height(root));

ceilAndFloor(root,70);
console.log("CEIL: ",ceil);
console.log("FLOOR: ",floor);