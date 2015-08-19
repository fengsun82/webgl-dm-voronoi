/**
 * @author Raoul Harel
 * @license The MIT license (LICENSE.txt)
 * @copyright 2015 Raoul Harel
 * @url https://github.com/rharel/webgl-dm-voronoi
 */

function MarkerLayer() {

  this._sites = {};
  this._markers = {};
  this._origin = new THREE.Object3D();

  this._markerGeometry = new THREE.PlaneGeometry(1, 1);
  this._markerMaterial = new THREE.MeshBasicMaterial({
    color: MarkerLayer.style.color
  });

  this.visible = false;
}

MarkerLayer.style = {
  color: new THREE.Color(0, 0, 0),
  size: 5
};

MarkerLayer.prototype = {

  constructor: MarkerLayer,

  add: function(site) {

    if (!!this._markers[site.id]) { return; }

    var marker;

    switch (site.type) {

      default: {  // point

        marker = new THREE.Mesh(
          this._markerGeometry,
          this._markerMaterial
        );

        marker.scale.set(
          MarkerLayer.style.size,
          MarkerLayer.style.size,
          1
        );

        break;
      }
    }

    this._sites[site.id] = site;
    this._markers[site.id] = marker;
    this._origin.add(marker);
  },

  remove: function(site) {

    if (!this._markers[site.id]) { return; }

    var marker = this._markers[site.id];
    this._origin.remove(marker);
    this._markers[site.id] = null;
    this._sites[site.id] = null;
  },

  update: function() {

    for (var id in this._sites) {

      var marker = this._markers[id];
      var site = this._sites[id];

      switch (site.type) {

        default: {  // point

          marker.position.set(site.x, site.y, 0);
        }
      }
    }
  },

  get visible() { return this._origin.visible; },
  set visible(value) { this._origin.visible = !!value; },

  get origin() { return this._origin; }
};