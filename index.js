'use strict';

module.exports = function (ret, conf, settings, opt) {
    
    var r = /#parse\((.+)\)/ig;
    
    fis.util.map(ret.src, function(subpath, file) {
        
        var setFlag;
        
        // 遍历所有vm(isViews)
        if (file.isHtmlLike && file.isViews) {
            
            // 替换#parse
            var c = file._content.replace(r, function(all, target/*被parse的widget*/) {
                
                var url = '';
                
                // 再次遍历所有vm(isViews)，找到对应的widget vm
                fis.util.map(ret.src, function(sub, f) {
                    if ( f.isHtmlLike && f.isViews && target.indexOf(f.id) > -1 ) {
                            
                        url = '#parse(\'' + f.url + '\')';
                        !setFlag && (setFlag = true);
                        return true;
                    }
                });

                return url || '';
            });

            if (setFlag) {
                file.setContent(c);
            }
        }
    });
};