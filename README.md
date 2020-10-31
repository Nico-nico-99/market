# 参考变量定义列表

这是参考变量定义列表：

- 商品commodity
- cm_id：PK
- name：string, [1,16]
- details：string, [1,16]
- price：float
- ！！！address：int, 0-置空[不筛选地址]，1-大学城，2-五山，3-国际，4-其他
- ！！！picture_url1 ：String, "https://../..jpg"
- picture_url2
- picture_url3
- launch_time：YYYY-MM-DD HH:MM:SS
- is_new: int, 0-非全新，1-全新
- classify: int，0-置空[不筛选类别]，1-电子产品，2-讲座票，3-校园网，4-日用品，5-书籍，6-文具，7-美妆，8-零食，9-其他
- state：int,1-待审核，2-审核通过，3-审核不通过，4-被预定 ，5-已付款售出，6-被举报
- classify:int,1-电子产品，2-讲座票，3-校园网，4-日用品 ，5-书籍，6-文具，7-美妆，8-零食，9-其他
