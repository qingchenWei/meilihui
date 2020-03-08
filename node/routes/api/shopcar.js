let router = require('express').Router();
let open = require('../../utils/mgdb').open;
let jwt = require('../../utils/jwt')

router.post('/', (req, res, next) => {

  let { userId, oprate } = req.body;
  if (oprate == 'find') {
    open({//链接库
      dbName: 'meilihui',
      collectionName: 'shopcar'
    }).then(
      ({ collection, client }) => {
        //查询
        collection.find({
          userId
        }, {}).toArray((err, result) => {//obj->arr
          if (err) {
            res.send({ err: 1, msg: '集合操作失败3' })
          } else {
            if (result.length > 0) {
              res.send({ err: 2, msg: result[0] });
            } else {
              res.send({ err: 2, msg: '用户不存在' });
            }
          }
          client.close()
        })
      }
    )
  }
  if (oprate == 'add') {
    let{img, price, name, brand, goodsId} = req.body;
    let myshopcar = [{goodsId, img, price, name, brand, num: 1 }]
    open({//链接库
      dbName: 'meilihui',
      collectionName: 'shopcar'
    }).then(
      ({ collection, client }) => {
        //查询
        collection.find({
          userId
        }, {}).toArray((err, result) => {//obj->arr
          if (err) {
            res.send({ err: 1, msg: '集合操作失败3' })
          } else {
            if (result.length > 0) {//用户有购物车
              let currentshopcar = JSON.parse(result[0].myshopcar);
              let isBeing = false;
              currentshopcar.forEach(items => {
                if(items.goodsId ==  goodsId){
                  isBeing = true;
                  items.num++;
                }
              });
              if(!isBeing){
                currentshopcar.push({goodsId, img, price, name, brand, num: 1 })
              }
              collection.update({userId},{$set:{myshopcar:JSON.stringify(currentshopcar)}})
              res.send({
                err:0,msg:'修改成功'
              })
            } else {//用户没有购物车
              collection.insertOne({
                userId, myshopcar: JSON.stringify(myshopcar)
              }, (err, result) => {
                if (!err) {
                  res.send({
                    err: 0, msg: '添加成功'
                  })
                } else {
                  res.send({ err: 1, msg: '注册失败' })
                }
              })
            }
          }
          client.close()
        })
      }
    )
  }
})
module.exports = router;