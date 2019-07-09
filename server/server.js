const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const routes = require('./src/routes/routes')
const mongoose = require('mongoose')
const cors = require('cors'); 
const fileUpload = require('express-fileupload');
const path = require('path');
const session = require('express-session');
const http = require('http')
const axios = require('axios')
var _findIndex = require('lodash/findIndex')
var MongoStore = require('connect-mongo')(session);
const geolib = require('geolib')

const app = express()
const server = http.createServer(app)
const socketIO = require('socket.io')
const io = socketIO(server)


const PORT = process.env.PORT || 8797
const db = mongoose.connection;
 
dotenv.config()

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

//Connect DB
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => console.log('DB Connected!'));
db.on('error', (err) => {
    console.log('DB connection error:', err.message);
})
 
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended: false}));
app.use(fileUpload());
app.use(cors())
app.use(bodyParser.json())
app.use(expressValidator())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({
        mongooseConnection: db
      })
}));

app.use('/', routes)

var bacTaiTrucTuyen = []

io.on('connection', function(socket) {
    
    console.log(socket.id + ': connected')
    
    //console.log('Số lượng bác tài đang ở trạng thái nhận xe: ' + bacTaiTrucTuyen.length)
    socket.on('disconnect', function() {
        console.log(socket.id + ': disconnected')
        //$index = _findIndex(bacTaiTrucTuyen, ['id', socket.id]);
        //bacTaiTrucTuyen.splice($index, 1);
        //console.log('Số lượng bác tài trực tuyến: ' + bacTaiTrucTuyen.length)
        
    })
    socket.on('tructuyen', data => {
        console.log('chayxe')
        console.log(data)
        bacTaiTrucTuyen.push({
            id: socket.id,
            username: data.username,
            sdt: data.sdt,
            viDo: data.viDo,
            kinhDo: data.kinhDo,
        })
        console.log('Số lượng bác tài đang ở trạng thái nhận xe: ' + bacTaiTrucTuyen.length)
        console.log('Danh sách bác tài')
        bacTaiTrucTuyen.forEach((item, index, array) => {
            console.log(item, index)
        })
        
    })
    
    socket.on('nhanchuyen_boqua', data => {
        if(data.luaChon === true) {
            console.log('nhanchuyen')
        }
        else if (data.luaChon === false) {
            console.log('boqua')
        }
        
    })

    //Phần của khách đặt xe
    socket.on('datxe', data => {
        let danhSachBacTai = []
        console.log(data)
        
        bacTaiTrucTuyen.forEach(function(item, index, array) {
            let khoangCachBacTaiVaKH = geolib.getDistance(    
                { latitude: data.viDoDi, longitude: data.kinhDoDi },
                { latitude: item.viDo, longitude: item.kinhDo }
            )
            danhSachBacTai.push({
                id: socket.id,
                username: item.username,
                viDo: item.viDo,
                kinhDo: item.kinhDo,
                khoangCach: khoangCachBacTaiVaKH,
            })
        })
        var bacTaiGanNhat = TimBacTaiGanNhat(danhSachBacTai)

        io.to(bacTaiGanNhat.id).emit('phanhoi', {
            sdtBacTai: '0337301998',
        })

        /*
        var khoangCach = geolib.getDistance(    
            { latitude: data.viDoDi, longitude: data.kinhDoDi },
            { latitude: data.viDoDen, longitude: data.kinhDoDen }
        )
        console.log('Khoảng cách: ' + khoangCach)
        */
        
        /*
        socket.emit('phanhoi', {
            hoTenBacTai: 'Trần Duy Khánh',
            sdtBacTai: '0337301998',
            soXe: '59N2 62823',
        })*/
        //io.to(bacTaiTrucTuyen[0].id).emit('yeucaudatxe', data)
        /*
        let danhSachKhoangCach = []
        console.log(data)
        console.log(bacTaiTrucTuyen[0] + 'bac tai truc tuyen dau tien')
        if(bacTaiTrucTuyen.length > 0) {
            console.log(bacTaiTrucTuyen[0] + '-----------------')
            for(var i = 0; i<bacTaiTrucTuyen.length; i++) {
                console.log(bacTaiTrucTuyen[i] + '@@@@@@@@@@@@@@@@@@')
                var id = bacTaiTrucTuyen[i].id
                var username = bacTaiTrucTuyen[i].username
                var viDo = bacTaiTrucTuyen[i].viDo
                var kinhDo = bacTaiTrucTuyen[i].kinhDo
                var khoangCach = ''
                
                axios.get(`https://router.project-osrm.org/route/v1/driving/${bacTaiTrucTuyen[i].kinhDo},${bacTaiTrucTuyen[i].viDo};${data.noiDonKhach_kinhDo},${data.noiDonKhach_viDo}`)
                .then(res => {
                    khoangCach = res.data.routes[0].distance
                })
                .catch(err => {
                    console.log('Loi: ' + err)
                })
                danhSachKhoangCach.push({
                    id: id,
                    username: username,
                    viDo: viDo,
                    kinhDo: kinhDo,
                    khoangCach: khoangCach
                })
                console.log(danhSachKhoangCach[0] + 'danh sach khoang cach')

            }
            var bacTaiGanNhat = TimBacTaiGanNhat(danhSachKhoangCach)
            console.log(bacTaiGanNhat + 'bac tai gan nhat')
            io.to(bacTaiGanNhat.id).emit('yeucaudatxe', data)
        }
        */
        
        
    })
    
})

TimBacTaiGanNhat = (mang) => {
    let ganNhat = mang[0].khoangCach
    for(let i = 0; i<mang.length; i++) {
        if(mang[i].khoangCach<ganNhat) {
            ganNhat = mang[i]
        }
    }
    return ganNhat //trả về bác tài gần nhất
}


server.listen(PORT, () => {console.log("Server started on http://localhost:"+PORT)})

module.exports = app;