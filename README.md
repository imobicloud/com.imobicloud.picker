# Tabbed Bar
====

Picker for iOS and Android
IOS
![Picker example](https://goo.gl/photos/NnRWANvxEMBdmGZB7)
Android
![Picker example](https://goo.gl/photos/GHetDWa77Q6uTb8L6)

app.tss

	// global styles
    ".picker": { height: 216 }
	".picker-header": { height: 32, top: 0, backgroundColor: '#484d57' }
		".picker-header-column": {  }
			".picker-header-label": { left: 10, color: '#fff', font: { fontSize: 12, fontWeight: 'bold' } }
	".picker-body": { top: 32 }
	".picker-body[platform=ios]": { width: '100%' }
	".picker-no-header": { top: 0 }	
		".picker-item[platform=ios]": { font: { fontSize: 14 } }
		".picker-list[platform=android]": { separatorInsets: { left: 0, right: 0 }, separatorColor: '#e7e7e7', backgroundColor: '#f7f9f9' }
			".picker-item[platform=android]": { height: 42, backgroundColor: 'transparent', selectedBackgroundColor: 'transparent' }	
				".picker-item-icon[platform=android]": { left: 10, width: 32, height: 32, touchEnabled: false }
				".picker-item-title[platform=android]": { left: 52, color: '#222', font: { fontSize: 16 }, touchEnabled: false }
	
    // custom column names
    ".picker-test": {  }
		".column-xxx[platform=android]": { width: '50%', left: 0 }
		".column-yyy[platform=android]": { width: '50%', left: '50%' }
		".column-yyy[platform=ios]": { width: 100, left: 100 } // IOS: width must be a number

js 

	var column_1 = {
 		classes: 'column-xxx',
 		template: 'title',
 		rows: [],
 		selectedRow: 0
	 };
	 
	var column_2 = {
 		classes: 'column-yyy',
 		template: 'title',
 		rows: [],
 		selectedRow: 0
 	};
	
	for (var i = 0; i < 10; i++) {
		column_1.rows.push({
			id:    i,
			title: 'Column 1 - Row ' + i
		});
		column_2.rows.push({
			id:    i,
			title: 'Column 2 - Row ' + i
		});
	}
	
	var picker = Alloy.createWidget('com.imobicloud.picker', $.createStyle({ classes: 'picker-test', columns: [ column_1, column_2 ] }));
	picker.setSelectedRow(0, 0, false);
	picker.on('change', pickerChanged);
	$.getView().add(picker.getView());
	
	function pickerChanged(e) {
		if (e.columnIndex != 0) {
			var id = e.value.id;
			// var title = e.value.title;
			updateColumn_2(id);
		}
	}
	
	// update rows of column 2 based on column 1
	function updateColumn_2(id) {
		var items = [];
		for (var i = 0; i < 10; i++) {
			items.push({
				 id:    i,
				 title: 'Column 2 - Row ' + i
			});
		}
		
		column_2.rows = items;
		picker.setSelectedRow( 1, 0, false );
		picker.reloadColumn(1, column_2);
	}
	
API

	picker.getSelectedRow(columnIndex); // ==> return: selected row's data
	picker.getSelectedRows();			// ==> return: array of selected row's data 
	picker.setSelectedRow(columnIndex, rowIndex, animated);
	picker.reloadColumn();				// ==> reload column UI
	picker.reset();						// ==> reset selected status
	picker.unload();					// ==> remove picker data