function CellTable(property) {

    var _this = this;

    var defaultProperty = {
        "table": '#cell-table',
        "addColumn": '#add-column',
        "addRow": '#add-row',
        "removeRow": '#remove-row',
        "removeColumn": '#remove-col',
        "hover": '.hover'
    };

    property = Object.assign(defaultProperty, property || {});

    this.hover = document.querySelectorAll(property.hover);
    this.table = document.querySelector(property.table);
    this.addColumn = document.querySelector(property.addColumn);
    this.addRow = document.querySelector(property.addRow);
    this.removeRow = document.querySelector(property.removeRow);
    this.removeColumn = document.querySelector(property.removeColumn);

    if (_this.table) {
        this.addColumn.addEventListener('click', function () {
            addCol(_this.table);
        });

        this.addRow.addEventListener('click', function () {
            addRow(_this.table);
        });

        this.removeColumn.addEventListener('click', function () {
            removeColumn(_this.removeColumn.getAttribute('data-table'))
        });

        this.removeRow.addEventListener('click', function () {
            removeRow(_this.removeRow.getAttribute('data-table'));
        });

        this.table.tBodies[0].addEventListener('mouseover', function (e) {
            var cellTD = document.elementFromPoint(e.clientX, e.clientY);
            var coords = cellTD.getBoundingClientRect();
                var RowIndex = cellTD.parentNode.rowIndex;
                var CellIndex = cellTD.cellIndex;
                _this.removeColumn.setAttribute('data-table', CellIndex);
                _this.removeRow.setAttribute('data-table', RowIndex);
            if (cellTD == '[object HTMLTableCellElement]') {
                buttonsPosition(coords.top+window.pageYOffset, coords.left+window.pageXOffset);
            }
        });

        for (i = 0; i < _this.hover.length; i++){
            _this.hover[i].addEventListener('mouseover', function () {
                var cellsLength = _this.table.rows[0].cells.length;
                var rowLength = _this.table.rows.length;
                if(cellsLength <= 1){
                    _this.removeColumn.style.display = 'none';
                } else {
                    _this.removeColumn.style.display = 'block';
                }
                if (rowLength <= 1){
                    _this.removeRow.style.display = 'none';
                } else {
                    _this.removeRow.style.display = 'block';
                }
            })
            _this.hover[i].addEventListener('mouseout', function (){
                _this.removeRow.style.display = 'none';
                _this.removeColumn.style.display = 'none';
            })
        }
    }

    function removeColumn(cellIndex) {
        var Collumns = _this.table.tBodies[0].rows; 
        var rowsLength = _this.table.tBodies[0].rows.length;
        var removeColumnLeft = Collumns[0].cells[0].getBoundingClientRect();
        var defaultCoordLeft = removeColumnLeft.left + window.pageXOffset;
        for (var i = 0; i < rowsLength; i++ ){
            if(_this.table.tBodies[0].rows[i].cells.length !== 1){
                _this.removeColumn.style.display = 'none';
                _this.removeColumn.style.left = defaultCoordLeft + 'px';
                removeCol(cellIndex, Collumns[i]);
            } 
        }
        
    }

    function removeRow(rowIndex) {
         var Collumns = _this.table.tBodies[0];
         var cellsLength = _this.table.tBodies[0].rows[0].cells.length;
         var removeRowTop = Collumns.rows[0].cells[0].getBoundingClientRect();
         var defaultCoordsTop = removeRowTop.top + window.pageXOffset;
         console.log(rowIndex);
            if(_this.table.rows.length !== 1){
                _this.removeRow.style.display = 'none';
                _this.removeRow.style.top = defaultCoordsTop + 'px' ;
                RemoveRow(Collumns, rowIndex);
            }
    }

    function RemoveRow(Collumns, rowIndex) {
        return Collumns.deleteRow(rowIndex);
    }

    function removeCol(cellIndex, Collumns) {
        return Collumns.deleteCell(cellIndex);
    }


    function addCell(row) {
        return row.insertCell(-1);
    }

    function addRow(table) {
        var NewRow = table.insertRow(-1);
        var ColsLength = table.tBodies[0].rows[0].cells.length;
        for (var i = 0; i < ColsLength; i++) {
            addCell(NewRow);
        }
    }

    function addCol(table) {
        var Rows = table.tBodies[0].rows;
        var RowsLenght = Rows.length;
        for (var i = 0; i < RowsLenght; i++) {
            addCell(Rows[i]);
        }
    }
    function buttonsPosition(x, y) {
        _this.removeColumn.style.left = y + 'px';
        _this.removeRow.style.top = x + 'px';
    }
}



document.addEventListener('DOMContentLoaded', function () {
    var table = new CellTable({'table': '#dynamic'});
});
