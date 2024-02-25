let tree = new Tree([]);

function addNode() {
    const nodeValueElement = document.getElementById('nodeValue');
    const nodeValue = parseInt(nodeValueElement.value, 10);
    if (!isNaN(nodeValue)) {
        tree.insert(nodeValue);
        updateVisual();
        nodeValueElement.value = ''; 
    } else {
        alert('Please enter a valid number.');
    }
}

function deleteNode() {
    const nodeValueElement = document.getElementById('nodeValue');
    const nodeValue = parseInt(nodeValueElement.value, 10);
    if (!isNaN(nodeValue)) {
        tree.deleteItem(nodeValue);
        updateVisual();
        nodeValueElement.value = ''; 
    } else {
        alert('Please enter a valid number.');
    }
}

function updateVisual() {
    const visualContainer = document.getElementById('treeVisual');
    visualContainer.innerHTML = ''; 
    prettyPrintHtml(tree.root, visualContainer);
}

function prettyPrintHtml(node, container, prefix = "", isLeft = true) {
    if (node !== null) {
        let newElement = document.createElement("div");
        if (node.right !== null) {
            prettyPrintHtml(node.right, container, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        newElement.textContent = `${prefix}${isLeft ? "└── " : "┌── "}${node.data}`;
        container.appendChild(newElement);
        if (node.left !== null) {
            prettyPrintHtml(node.left, container, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

function checkBalance() {
    alert(tree.isBalanced() ? "The tree is balanced." : "The tree is not balanced.");
}

function rebalanceTree() {
    tree.rebalance();
    updateVisual();
    alert("The tree has been rebalanced.");
}

function traverseTree(traversalType) {
    let result;
    switch (traversalType) {
        case 'levelOrder':
            result = tree.levelOrder();
            break;
        case 'inOrder':
            result = tree.inOrder();
            break;
        case 'preOrder':
            result = tree.preOrder();
            break;
        case 'postOrder':
            result = tree.postOrder();
            break;
        default:
            result = [];
    }
    alert('Traversal Result: ' + result.join(', '));
}


updateVisual();
