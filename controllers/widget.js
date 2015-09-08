/*
 args = {
 	columns: [{
 		classes: '',
 		title: '', // string or undefined
 		template: '', // 'title', 'icon' or 'icon-title'
 		rows: [{
 			id: '',
 			icon: '',
 			title: ''
 		}],
 		selectedRow: 0 // row index
 	}]
 }
 
 $.datePicker.on('picker:change', function(e) {
	var item = e.section.getItemAt(e.rowIndex);
	item.properties.accessoryType = e.isSelected ? Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK : Ti.UI.LIST_ACCESSORY_TYPE_NONE;
	e.section.updateItemAt(e.rowIndex, item);
});
 * */
init(arguments[0]);
function init(args) {
	var exclude = ['id', 'children', 'columns'],
		style = _.omit(args, exclude);
	$.container.applyProperties(style);
	
	//
	
	var picker = Widget.createController('picker_' + (Ti.Platform.osname == 'android' ? 'android' : 'ios'), {});
	picker.on('change', function(e) {
		$.trigger('change', { columnIndex: e.columnIndex, rowIndex: e.rowIndex, value: e.value });
	});
	
	//
	
	var columns = args.columns;
	if (columns.length) {
		if (columns[0].title) {
			var header = $.UI.create('View', { classes: 'picker-header'});
			for(var i=0,ii=columns.length; i<ii; i++){
				var column = columns[i];
				var headerColumn = $.UI.create('View', { classes: 'picker-header-column ' + column.classes });
					headerColumn.add( $.UI.create('Label', { text: column.title, classes: 'picker-header-label' }) );
				header.add(headerColumn);
			};
			$.container.add(header);
		} else {
			$.addClass(picker.getView(), 'picker-no-header');
		}
	}
	
	//
	
	picker.init(args);
	$.container.add( picker.getView() );
	
	exports.unload = picker.unload;
	exports.reset  = picker.reset;
	exports.reloadColumn    = picker.reloadColumn;
	exports.setSelectedRow  = picker.setSelectedRow;
	exports.getSelectedRow  = picker.getSelectedRow;
	exports.getSelectedRows = picker.getSelectedRows;
}