const db = wx.cloud.database();
//可通过将console.log取消注释查看步骤结果
Page({
  data: {
    DepartmentsList: "",
    DepartmentsListCounts: "",
    DepartmentsListNames: [],
    DepartmentsListFirst: [],
    multiArray: [
      [''],
      ['']
    ],
    multiIndex: [0, 0],
  },

  cloudgetDepartments(id) {
    wx.cloud.callFunction({
      name: 'getDepartments', // 这里要和云函数的名字一致
      data: {
        id: id
      }
    }).then(res => {
      // console.log(res.result.list)
      this.setData({
        DepartmentsList: res.result.list,
        DepartmentsListCounts: res.result.count,
      })
      this.defaultDepartment_id();
      this.getDepartmentsListNames();
    }).catch(err => {
      console.log(err)
    })
  },

  defaultDepartment_id() {
    this.setData({
      Department_id: this.data.DepartmentsList[0]._id
    })
  },

  getDepartmentsListNames: function () {
    var that = this;
    // console.log("getDepartmentsListNames");
    for (let index = 0; index < this.data.DepartmentsListCounts; index++) {
      var Name = this.data.DepartmentsList[index].Name;
      var First = this.data.DepartmentsList[index].firstletter;
      // console.log(First + " " + Name);
      var obj = {};
      obj.First = First;
      obj.Name = Name;
      let DepartmentsListNames = this.data.DepartmentsListNames;
      let DepartmentsListFirst = this.data.DepartmentsListFirst;
      let multiArray = this.data.multiArray;
      if (DepartmentsListFirst.indexOf(obj.First) == -1) {
        DepartmentsListFirst = DepartmentsListFirst.concat(obj.First);
      }
      if (this.data.DepartmentsList[index].firstletter == DepartmentsListFirst[0]) {
        DepartmentsListNames = DepartmentsListNames.concat(obj.Name);
      }
      multiArray[0] = DepartmentsListFirst;
      multiArray[1] = DepartmentsListNames;
      that.setData({
        multiArray,
        DepartmentsListNames,
        DepartmentsListFirst
      })
    }
    wx.hideLoading();
    // console.log(this.data.DepartmentsListNames)
    // console.log(this.data.DepartmentsListFirst)
  },

  bindMultiPickerChange: function (e) { //确定多重选择器
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    // console.log("选择科室名称为:" + this.data.multiArray[1][e.detail.value[1]])
    this.setData({
      multiIndex: e.detail.value
    })
    db.collection('demoDepartments').where({
      Name: this.data.multiArray[1][e.detail.value[1]]
    }).get().then(res => {
      // console.log(res.data[0]._id)
      this.setData({
        Department_id: res.data[0]._id
      })
    })
  },

  bindMultiPickerColumnChange: function (e) { //更改多重选择器
    //e.detail.column为列，，e.detail.value为值
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    var that = this;
    var arr = [];
    var array = this.data.DepartmentsList;
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          //这里只需要简单的复制即可
          case 0:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            // var arr = [];
            // var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              var element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          case 1:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            // var arr = [];
            // var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              var element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          case 2:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            // var arr = [];
            // var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              const element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          case 3:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            var arr = [];
            var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              const element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          case 4:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            var arr = [];
            var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              const element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          case 5:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            var arr = [];
            var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              const element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          case 6:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            var arr = [];
            var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              const element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          case 7:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            var arr = [];
            var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              const element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          case 8:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            var arr = [];
            var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              const element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          case 9:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            var arr = [];
            var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              const element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          case 10:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            var arr = [];
            var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              const element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          case 11:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            var arr = [];
            var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              const element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          case 12:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            var arr = [];
            var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              const element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          case 13:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            var arr = [];
            var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              const element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          case 14:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            var arr = [];
            var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              const element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          case 15:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            var arr = [];
            var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              const element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          case 16:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            var arr = [];
            var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              const element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          case 17:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            var arr = [];
            var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              const element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          case 18:
            // console.log(data.multiArray[0][data.multiIndex[0]])
            var arr = [];
            var array = that.data.DepartmentsList;
            for (let index = 0; index < that.data.DepartmentsListCounts; index++) {
              const element = array[index].firstletter;
              // console.log(element)
              if (element == that.data.multiArray[0][data.multiIndex[0]]) {
                // console.log("匹配上了"+array[index].Name)
                var obj = {}
                obj.Name = array[index].Name
                arr = arr.concat(obj.Name)
              }
            }
            data.multiArray[1] = arr; //放C的
            break;
          default:
            this.onShow();

        }
        data.multiIndex[1] = 0;
        break;
    }
    this.setData(data);
  },

  onLoad(options) {
    wx.showLoading({
      title: '数据加载中',
    });
    //id为从上级页面传参，从数据库中获取对应数据
    this.cloudgetDepartments(options.id);
  },
})