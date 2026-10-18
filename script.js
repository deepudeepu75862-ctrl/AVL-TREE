
// Node class
class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

// Get height
function height(n) {
  return n ? n.height : 0;
}

// Right rotate
function rightRotate(y) {
  let x = y.left;
  let T2 = x.right;

  x.right = y;
  y.left = T2;

  y.height = Math.max(height(y.left), height(y.right)) + 1;
  x.height = Math.max(height(x.left), height(x.right)) + 1;

  return x;
}

// Left rotate
function leftRotate(x) {
  let y = x.right;
  let T2 = y.left;

  y.left = x;
  x.right = T2;

  x.height = Math.max(height(x.left), height(x.right)) + 1;
  y.height = Math.max(height(y.left), height(y.right)) + 1;

  return y;
}

// Balance factor
function getBalance(n) {
  return n ? height(n.left) - height(n.right) : 0;
}

// Insert AVL
function insert(node, key, steps) {
  if (!node) {
    steps.push("Insert " + key);
    return new Node(key);
  }

  if (key < node.val) {
    node.left = insert(node.left, key, steps);
  } else {
    node.right = insert(node.right, key, steps);
  }

  node.height = 1 + Math.max(height(node.left), height(node.right));

  let balance = getBalance(node);

  // LL
  if (balance > 1 && key < node.left.val) {
    steps.push("LL Case → Right Rotation");
    return rightRotate(node);
  }

  // RR
  if (balance < -1 && key > node.right.val) {
    steps.push("RR Case → Left Rotation");
    return leftRotate(node);
  }

  return node;
}

// Build tree
function buildAVL() {
  let input = document.getElementById("values").value.trim();
  let arr = input.split(" ").map(Number);

  let root = null;
  let steps = [];

  steps.push("Start AVL Insertion");

  for (let x of arr) {
    root = insert(root, x, steps);
  }

  // LEFT PANEL (Meaning)
  document.getElementById("meaning").innerHTML =
    "AVL Tree is a self-balancing BST.<br>" +
    "Balance Factor must be -1, 0, +1.<br>" +
    "Rotations maintain balance.";

  // RIGHT PANEL (Steps)
  document.getElementById("steps").innerHTML =
    steps.map(s => "✔ " + s).join("<br>");

  // MIDDLE PANEL (Tree)
  document.getElementById("tree").innerText =
    printTree(root, "", true);
}

// Print tree
function printTree(node, prefix, isLeft) {
  if (!node) return "";

  let result = "";

  if (node.right) {
    result += printTree(node.right, prefix + (isLeft ? "│   " : "    "), false);
  }

  result += prefix + (isLeft ? "└── " : "┌── ") + node.val + "\n";

  if (node.left) {
    result += printTree(node.left, prefix + (isLeft ? "    " : "│   "), true);
  }

  return result;
}