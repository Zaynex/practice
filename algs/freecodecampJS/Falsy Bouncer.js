/*
删除数组中的所有假值。

在JavaScript中，假值有false、null、0、""、undefined 和 NaN。
 */
function bouncer(arr) {
  // Don't show a false ID to this bouncer.
  var oarr = arr.filter(function isTrue(val) {
  	return Boolean(val) == true;
  });
  return oarr;
}

bouncer([7, "ate", "", false, 9]);
