var controllers = [];

exports.init = function(args) {
	var columns = args.columns;
	for(var i=0,ii=columns.length; i<ii; i++){
		var controller = loadColumn(i, columns[i]);
		controllers.push(controller);
		$.picker.add( controller.getView() );
	};
};

function loadColumn(index, column) {
	column.columnIndex = index;
	
	var controller = Widget.createController('column', column);
	controller.on('change', function(e) {
		$.trigger('change', { columnIndex: e.columnIndex, rowIndex: e.rowIndex, value: e.value });
	});
	
	controller.getView().columnIndex = index;
	
	return controller;
}

exports.unload = function() {
	for(var i = 0, ii = controllers.length; i < ii; i++) {
      	controllers[i].unload();
    };
    controllers.length = 0;
};

exports.reset = function () {
    for(var i = 0, ii = controllers.length; i < ii; i++) {
      	controllers[i].reset();
    };
};

exports.reloadColumn = function(columnIndex, columnData) {
  	var columns = $.picker.children;
  	for(var i=0,j=columns.length; i<j; i++){
		if (columns[i].columnIndex === columnIndex) {
			$.picker.remove(columns[i]);
			break;
		}
	}
	
	var controller = loadColumn(columnIndex, columnData);
	controllers[columnIndex] = controller;
	$.picker.add( controller.getView() );
};

exports.setSelectedRow = function(columnIndex, rowIndex, animated) {
	controllers[columnIndex] && controllers[columnIndex].setSelectedRow(rowIndex, animated);
};

exports.getSelectedRow = function(columnIndex) {
	return controllers[columnIndex] ? controllers[columnIndex].getSelectedRow() : null;
};

exports.getSelectedRows = function() {
	var selectedRows = [];
	for(var i = 0, ii = controllers.length; i < ii; i++) {
      	selectedRows.push( controllers[i].getSelectedRow() );
    };
	return selectedRows;
};