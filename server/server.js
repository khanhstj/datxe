const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const routes = require('./src/routes/routes')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const http = require('http')
var MongoStore = require('connect-mongo')(session)
const geolib = require('geolib')

const app = express()
const server = http.createServer(app)
const socketIO = require('socket.io')
const io = socketIO(server)


const PORT = process.env.PORT || 8797
const db = mongoose.connection

dotenv.config()

//app.set('views', path.join(__dirname, 'views'))
//app.set('view engine', 'jade')

//Connect DB
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => console.log('DB Connected!'))
db.on('error', (err) => {
    console.log('DB connection error:', err.message)
})
 
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(fileUpload())
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
}))

app.use('/', routes)

var bacTaiTrucTuyen = []

io.on('connection', function(socket) {
    console.log(socket.id + ': connected')

    socket.on('disconnect', function() {
        console.log(socket.id + ': disconnected')
        xoaKhoiDanhSach(socket.id)        
    })

    socket.on('chayxe', data => {
        console.log('chayxe')
        console.log(data)
        bacTaiTrucTuyen.push({
            id: socket.id,
            sdt_BT: data.sdt_BT, //username cũng là số điện thoại của bác tài
            viDo_BT: data.viDo_BT,
            kinhDo_BT: data.kinhDo_BT,
            hoTen_BT: data.hoTen_BT,
            soXe_BT: data.soXe_BT,
        })

        console.log('Số lượng bác tài trực tuyến: ' + bacTaiTrucTuyen.length)
        console.log('Danh sách bác tài')
        bacTaiTrucTuyen.forEach((item, index, array) => {
            console.log(item, index)
        })
    })

    socket.on('tamdung', data => {
        console.log('tamdung')
        console.log(socket.id)
        xoaKhoiDanhSach(socket.id)
        console.log('Số lượng bác tài trực tuyến: ' + bacTaiTrucTuyen.length)
        bacTaiTrucTuyen.forEach((item, index, array) => {
            console.log(item, index)
        })
    })
    
    socket.on('nhanchuyen_boqua', data => {
		console.log('Nhận chuyến_bỏ qua')
        if(data.luaChon === true) {
			console.log('Lựa chọn là true')
			console.log(data.id_KH)
            io.to(data.id_KH).emit('bactainhanchuyen', {
                hoTen_BT: data.hoTen_BT,
                sdt_BT: data.sdt_BT,
                soXe_BT: data.soXe_BT,
            })

        }
        else if (data.luaChon === false) {
            console.log('boqua')
        }
    })
    

    //Phần của khách đặt xe
    socket.on('datxe', data => {
		console.log('datxe')
        var danhSachBacTai = []
		let id_KH = socket.id
		console.log(id_KH)
        console.log(data)
        
        if(bacTaiTrucTuyen.length > 0) {
            bacTaiTrucTuyen.forEach(function(item, index, array) {
                let khoangCachBacTaiVaKH = geolib.getDistance (
                    { latitude: data.viDoDi_KH, longitude: data.kinhDoDi_KH },
                    { latitude: item.viDo_BT, longitude: item.kinhDo_BT }
                )
                danhSachBacTai.push({
                    id: item.id,
                    sdt_BT: item.sdt_BT,
                    viDo_BT: item.viDo_BT,
                    kinhDo_BT: item.kinhDo_BT,
                    khoangCach: khoangCachBacTaiVaKH,
                })
            })
            var bacTaiGanNhat = TimBacTaiGanNhat(danhSachBacTai)
            console.log('Thông tin bác tài gần nhất: ' + bacTaiGanNhat.id)
    
            io.to(bacTaiGanNhat.id).emit('yeucauxe', {
                id_KH: socket.id,
                sdt_KH: data.sdt_KH,
                viDoDi_KH: data.viDoDi_KH,
                kinhDoDi_KH: data.kinhDoDi_KH,
                viTriDiemDi_KH: data.viTriDiemDi_KH,
                viDoDen_KH: data.viDoDen_KH,
                kinhDoDen_KH: data.kinhDoDen_KH,
                viTriDiemDen_KH: data.viTriDiemDen_KH,  
            })
            
        }
        else {
            socket.emit('khongcobactai')
        }

    })
    
})

TimBacTaiGanNhat = (mang) => {
    let ganNhat = mang[0]
    for(let i = 0; i<mang.length; i++) {
        if(mang[i].khoangCach<ganNhat.khoangCach) {
            ganNhat = mang[i]
        }
    }
    return ganNhat //trả về bác tài gần nhất
}

xoaKhoiDanhSach = (id) => {
    let xoa = -1
    bacTaiTrucTuyen.forEach( (item, index, array) => {
        if(id === item.id) {
            xoa = bacTaiTrucTuyen.indexOf(item)
        }
    })
    
    if(xoa !== -1) {
        bacTaiTrucTuyen.splice(xoa, 1)
    }
    
}

server.listen(PORT, () => {console.log("Server started on http://localhost:"+PORT)})

module.exports = app;