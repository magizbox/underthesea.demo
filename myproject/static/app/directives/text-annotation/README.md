# Text Annotation

[_Demo plunker_](https://plnkr.co/edit/xxnz6GzQmBGKBKJPaS2O?p=preview) <br/>
[_Project demo on github_](https://github.com/NguyenHauHN/text-annotation)



##### Cài đặt

Thêm javascript và css vào index.html

Chú ý: Thuộc tính component bắt buộc phải có trong thẻ script

```
<link rel="stylesheet" href="text-annotation.css">

<script src="brat.js">
<script component="text-annotation-script" src="text-annotation.js">
<script src="update-annotation-modal.js">
<script src="new-annotation-modal.js">

```

**Khai báo directive**

```
<text-annotation config="config" doc="doc" editable="true" multilabel="false" confirm="true"><text-annotation>
```
* Khai báo các file _text-annotation.js_, _update-annotation-modal.js_, _new-annotation-modal.js_
* Tham số: truyền giá trị cho các tham số, `config` và `doc` truyền từ controller với _$scope_, hai tham số còn lại `editable` và `multilabel` nhận hai giá trị _true_ và _false_.


**Các tham số trong directive**

* `component` (bắt buộc) - có giá trị **text-annotation-script** là thuộc tính của thẻ script khai báo directive, nhằm xác định đường dẫn tới thư mục chứa code html của các modal annotation. 
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

## Hướng dẫn sử dụng

* Mở modal cập nhật hoặc xóa nhãn bằng cách click vào tên nhãn bên trên token.
* Mở modal thêm mới nhãn bằng cách click đúp hoặc bôi đen một đoạn trong text.     
    
     