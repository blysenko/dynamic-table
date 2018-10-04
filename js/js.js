class CellTable {

    constructor(property) {

        let defaultProperty = {
            "table": '.cell-table',
            "addColumnButton": '.add-column',
            "addRowButton": '.add-row',
            "removeRowButton": '.remove-row',
            "removeColumnButton": '.remove-col',
            "hover": '.hover'
        };

        property = Object.assign(defaultProperty, property || {});


        this.hover = document.querySelectorAll(property.hover);
        this.table = document.querySelector(property.table);
        this.addColumnButton = document.querySelector(property.addColumnButton);
        this.addRowButton = document.querySelector(property.addRowButton);
        this.removeRowButton = document.querySelector(property.removeRowButton);
        this.removeColumnButton = document.querySelector(property.removeColumnButton);


        if (this.table) {
            this.addColumnButton.addEventListener('click', () => {
                this.addCol(this.table);
            });

            this.addRowButton.addEventListener('click', () => {
                this.addRow(this.table);
            });

            this.removeColumnButton.addEventListener('click', () => {
                this.removeColumn(this.removeColumnButton.getAttribute('data-table'))
            });

            this.removeRowButton.addEventListener('click', () => {
                this.removeRow(this.removeRowButton.getAttribute('data-table'));
            });

            this.table.tBodies[0].addEventListener('mouseover', (e) => {
                let cellTD = document.elementFromPoint(e.clientX, e.clientY);
                let coords = cellTD.getBoundingClientRect();
                let RowIndex = cellTD.parentNode.rowIndex;
                let CellIndex = cellTD.cellIndex;
                this.removeColumnButton.setAttribute('data-table', CellIndex);
                this.removeRowButton.setAttribute('data-table', RowIndex);
                if (cellTD == '[object HTMLTableCellElement]') {
                    this.buttonsPosition(coords.top + window.pageYOffset, coords.left + window.pageXOffset);
                }
            });

            for (let i = 0; i < this.hover.length; i++) {
                this.hover[i].addEventListener('mouseover', () => {
                    let cellsLength = this.table.rows[0].cells.length;
                    let rowLength = this.table.rows.length;
                    if (cellsLength <= 1) {
                        this.removeColumnButton.style.display = 'none';
                    } else {
                        this.removeColumnButton.style.display = 'block';
                    }
                    if (rowLength <= 1) {
                        this.removeRowButton.style.display = 'none';
                    } else {
                        this.removeRowButton.style.display = 'block';
                    }
                });
                this.hover[i].addEventListener('mouseout', () => {
                    this.removeRowButton.style.display = 'none';
                    this.removeColumnButton.style.display = 'none';
                });
            }
        }
    }


    removeColumn(cellIndex) {
        let Collumns = this.table.tBodies[0].rows;
        let rowsLength = this.table.tBodies[0].rows.length;
        let removeColumnButtonLeft = Collumns[0].cells[0].getBoundingClientRect();
        let defaultCoordLeft = removeColumnButtonLeft.left + window.pageXOffset;
        for (let i = 0; i < rowsLength; i++) {
            if (this.table.tBodies[0].rows[i].cells.length !== 1) {
                this.removeColumnButton.style.display = 'none';
                this.removeColumnButton.style.left = defaultCoordLeft + 'px';
                this.deleteCol(cellIndex, Collumns[i]);
            }
        }

    }

    removeRow(rowIndex) {
        let Collumns = this.table.tBodies[0];
        let cellsLength = this.table.tBodies[0].rows[0].cells.length;
        let removeRowButtonTop = Collumns.rows[0].cells[0].getBoundingClientRect();
        let defaultCoordsTop = removeRowButtonTop.top + window.pageXOffset;

        if (this.table.rows.length !== 1) {
            this.removeRowButton.style.display = 'none';
            this.removeRowButton.style.top = defaultCoordsTop + 'px';
            this.deleteRow(Collumns, rowIndex);
        }
    }

    deleteRow(Collumns, rowIndex) {
        return Collumns.deleteRow(rowIndex);
    }

    deleteCol(cellIndex, Collumns) {
        return Collumns.deleteCell(cellIndex);
    }


    addCell(row) {
        return row.insertCell(-1);
    }

    addRow() {
        let NewRow = this.table.insertRow(-1);
        for (let i = 0; i < this.table.tBodies[0].rows[0].cells.length; i++) {
            this.addCell(NewRow);
        }
    }

    addCol() {
        let Rows = this.table.tBodies[0].rows;
        for (let i = 0; i < Rows.length; i++) {
            this.addCell(Rows[i]);
        }
    }

    buttonsPosition(x, y) {
        this.removeColumnButton.style.left = y + 'px';
        this.removeRowButton.style.top = x + 'px';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new CellTable({'table': '.dynamic'});
});