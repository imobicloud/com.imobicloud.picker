var selectedIndexs = [];

exports.init = function (args) {
	var columns = [];
	
	for(var i=0,ii=args.columns.length; i<ii; i++){
		var column = args.columns[i];
		
		var pickerColumn = Ti.UI.createPickerColumn();
  	
		$.addClass(pickerColumn, column.classes);
		
		for(var j=0,jj=column.rows.length; j<jj; j++){
			var rowData = _.extend($.createStyle({ classes: 'picker-item' }), column.rows[j]);
			pickerColumn.addRow( Ti.UI.createPickerRow(rowData) );
		};
		
		columns.push(pickerColumn);
		
		selectedIndexs.push( column.selectedRow || 0 );
	};
	
	$.picker.add(columns);
};

function postlayout(e) {
  	$.picker.removeEventListener('postlayout', postlayout);
  	
  	for(var i=0,ii=selectedIndexs.length; i<ii; i++){
	  	$.picker.setSelectedRow(i, selectedIndexs[i], false);
	};
}

function pickerChange(e) {
  	selectedIndexs[ e.columnIndex ] = e.rowIndex;
  	$.trigger('change', { columnIndex: e.columnIndex, rowIndex: e.rowIndex, value: e.row });
}

exports.unload = function() {
	selectedIndexs.length = 0;
};

exports.reset = function () {
    for(var i=0,ii=selectedIndexs.length; i<ii; i++){
	  	$.picker.setSelectedRow(i, 0, false);
	  	selectedIndexs[i] = 0;
	};
};

exports.reloadColumn = function(columnIndex, columnData) {
	var rows = [];
	for(var j=0,jj=columnData.rows.length; j<jj; j++){
		var rowData = _.extend($.createStyle({ classes: 'picker-item' }), columnData.rows[j]);
		rows.push( Ti.UI.createPickerRow(rowData) );
	};
	
	var column = $.picker.columns[columnIndex];	
	column.rows = rows;
		
	$.picker.reloadColumn(column);
	selectedIndexs[columnIndex] = ( columnData.selectedRow || 0 );
};

exports.setSelectedRow = $.picker.setSelectedRow;

exports.getSelectedRow = $.picker.getSelectedRow;

exports.getSelectedRows = function() {
	var selectedRows = [];
	for(var i = 0, ii = selectedIndexs.length; i < ii; i++) {
      	selectedRows.push( $.picker.getSelectedRow(i) );
    };
	return selectedRows;
};