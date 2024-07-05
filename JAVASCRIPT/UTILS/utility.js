Array.prototype.parse2D = function () {
    const rows = [];
    for (i = 0; i < this.length; i += 16) {
        rows.push(this.slice(i, i + 16));
    }
    return rows;
};

Array.prototype.createObjectFrom2D = function () {
    const objects = [];
    this.forEach((arrayRow, columnY) => {
        arrayRow.forEach((symbol, rowX) => {
            if (symbol === 1) {
                objects.push(new CollisionBlock({
                    position: {
                        x: rowX * 64,
                        y: columnY * 64
                    }
                }));
            }
        });
    });
    return objects;
};