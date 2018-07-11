
/**
 * Blob constructor.
 */

var Blob = typeof window !== 'undefined' && window.Blob;

/**
 * ArrayBufferView support.
 */

var hasArrayBufferView = Blob && new Blob([new Uint8Array(100)]).size == 100;

/**
 * Return a `Blob` for the given data `uri`.
 *
 * @param {String} uri
 * @return {Blob}
 * @api public
 */

module.exports = function(uri){
  if (!Blob) return;
  var data = uri.split(',')[1];
  var bytes = typeof atob === 'undefined' ? window.atob(data) : atob(data);
  var buf = new ArrayBuffer(bytes.length);
  var arr = new Uint8Array(buf);
  for (var i = 0; i < bytes.length; i++) {
    arr[i] = bytes.charCodeAt(i);
  }

  if (!hasArrayBufferView) arr = buf;
  var blob = new Blob([arr], { type: mime(uri) });
  blob.slice = blob.slice || blob.webkitSlice;
  return blob;
};

/**
 * Return data uri mime type.
 */

function mime(uri) {
  return uri.split(';')[0].slice(5);
}
