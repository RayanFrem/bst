class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) return null;
        array = array.sort((a, b) => a - b).filter((item, pos, ary) => !pos || item !== ary[pos - 1]);
        const mid = parseInt((start + end) / 2);
        const node = new Node(array[mid]);
        node.left = this.buildTree(array, start, mid - 1);
        node.right = this.buildTree(array, mid + 1, end);
        return node;
    }

    insert(value) {
        const newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        let current = this.root;
        while (true) {
            if (value < current.data) {
                if (!current.left) {
                    current.left = newNode;
                    break;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    break;
                }
                current = current.right;
            }
        }
    }
    

    deleteNode(node, value) {
        if (node === null) {
            return node;
        }
        if (value < node.data) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.data) {
            node.right = this.deleteNode(node.right, value);
        } else {
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }
            node.data = this.minValue(node.right);
            node.right = this.deleteNode(node.right, node.data);
        }
        return node;
    }

    deleteItem(value) {
        this.root = this.deleteNode(this.root, value);
    }

    minValue(node) {
        let minv = node.data;
        while (node.left !== null) {
            minv = node.left.data;
            node = node.left;
        }
        return minv;
    }

    prettyPrintHtml(node = this.root, depth = 0) {
        if (node !== null) {
            let spaces = ' '.repeat(depth * 4);
            let nodeString = `${spaces} ${node.data}\n`;
            return this.prettyPrintHtml(node.left, depth + 1) + nodeString + this.prettyPrintHtml(node.right, depth + 1);
        }
        return '';
    }

    height(node) {
        if (node === null) {
            return -1;
        }
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    isBalanced(node = this.root) {
        if (node === null) {
            return true;
        }

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        } else {
            return this.isBalanced(node.left) && this.isBalanced(node.right);
        }
    }

    inOrder(node = this.root, values = []) {
        if (node) {
            this.inOrder(node.left, values);
            values.push(node.data);
            this.inOrder(node.right, values);
        }
        return values;
    }

    buildTreeFromSortedArray(values, start = 0, end = values.length - 1) {
        if (start > end) return null;

        let mid = Math.floor((start + end) / 2);
        let node = new Node(values[mid]);

        node.left = this.buildTreeFromSortedArray(values, start, mid - 1);
        node.right = this.buildTreeFromSortedArray(values, mid + 1, end);

        return node;
    }

    rebalance() {
        const values = this.inOrder(); 
        this.root = this.buildTreeFromSortedArray(values);
    }

    postOrder(callback = null, node = this.root, result = []) {
        if (node !== null) {
            this.postOrder(callback, node.left, result);
            this.postOrder(callback, node.right, result);
            if (callback) {
                callback(node);
            } else {
                result.push(node.data);
            }
        }
        return callback ? null : result;
    }

    preOrder(callback = null, node = this.root, result = []) {
        if (node !== null) {
            if (callback) {
                callback(node);
            } else {
                result.push(node.data);
            }
            this.preOrder(callback, node.left, result);
            this.preOrder(callback, node.right, result);
        }
        return callback ? null : result;
    }

    inOrder(callback = null, node = this.root, result = []) {
        if (node !== null) {
            this.inOrder(callback, node.left, result);
            if (callback) {
                callback(node);
            } else {
                result.push(node.data);
            }
            this.inOrder(callback, node.right, result);
        }
        return callback ? null : result;
    }

    levelOrder(callback = null) {
        let result = [];
        let queue = [this.root];
        
        while (queue.length) {
            let node = queue.shift();
            if (callback) {
                callback(node);
            } else {
                result.push(node.data);
            }
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        return callback ? null : result;
    }    
    
}
