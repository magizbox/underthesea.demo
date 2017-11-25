# Text Annotation

[Demo]()

```html
<text-annotation config="config" doc="doc"  ng-click><text-annotation>
```

Parameters

* `editable` (default: True) - có thể thay đổi nhãn cho text
* `multilabel` (default: False) - có thể gán nhiều nhãn cho một token

Lựa chọn multiable:
Nếu true: thì cho mở modal thêm mới, không cho chọn trùng label
Nếu false: không cho mở modal thêm mới