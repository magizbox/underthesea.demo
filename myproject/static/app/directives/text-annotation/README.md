# Text Annotation

[Demo](https://plnkr.co/edit/xxnz6GzQmBGKBKJPaS2O?p=preview)

```
<text-annotation config="config" doc="doc" editable="true" multilabel="false" confirm="true"><text-annotation>
```

##### Cách sử dụng:
* Tham số: truyền giá trị cho các tham số, `config` và `doc` truyền từ controller với _$scope_, hai tham số còn lại `editable` và `multilabel` nhận hai giá trị _true_ và _false_.
* Mở modal cập nhật hoặc xóa nhãn bằng cách click vào tên nhãn bên trên token.
* Mở modal thêm mới nhãn bằng cách click đúp hoặc bôi đen một đoạn trong text.

##### Các tham số trong directive:

* `config` (_bắt buộc_) - cấu hình nhãn của text
* `doc` (_bắt buộc_) - chứa text và các entities cúa các thành phần trong text
* `editable` (mặc định: _false_) - thay đổi nhãn cho text <br/>
     _true_: có thể mở modal update và thêm mới entity cho token <br/>
     _false_: không thể mở modal nào
* `multilabel` (mặc định: _false_) - gán nhiều nhãn cho một token. <br/>
     _true_: mở modal thêm mới, lọc bỏ những entity đã tồn tại trong token được chọn  trong danh sách entity. 
     Cần đặt giá trị cho `editable` là _true_ thì tham số `multilabel` mới có thể nhận sự kiện. <br/>
     _false_: không cho mở modal thêm mới
* `confirm` (mạc định: true) - hiển thị alert xác nhận thao tác
     
    
     