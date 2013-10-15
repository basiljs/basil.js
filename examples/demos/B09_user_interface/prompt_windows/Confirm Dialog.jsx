////////////////////////////////////////////////////////////////////////////////
// This script belongs to the following tutorial:
//
// http://scriptographer.org/tutorials/user-interface/displaying-dialog-windows/

var decision = Dialog.confirm('Do you want to know the Answer to the Ultimate Question of Life, the Universe, and Everything?');
if (decision) {
	Dialog.alert('The Answer is 42, what was the question again?');
}
