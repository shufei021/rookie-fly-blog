# uniapp
## 全局文件

这里主要是两个文件：pages.json管理页面路由、和manifest.json管理应用配置。

### pages.json

pages.json 文件是进行全局配置，包括`页面文件路径`、`样式`、`原生导航栏`等内容

以下是官网给出的配置示例：

::: details

```js
{
  "pages": [
    {
      "path": "pages/component/index",
      "style": {
        "navigationBarTitleText": "组件"
      }
    },
    {
      "path": "pages/API/index",
      "style": {
        "navigationBarTitleText": "接口"
      }
    },
    {
      "path": "pages/component/view/index",
      "style": {
        "navigationBarTitleText": "view"
      }
    }
  ],
  "condition": {
    //模式配置，仅开发期间生效
    "current": 0, //当前激活的模式（list 的索引项）
    "list": [
      {
        "name": "test", //模式名称
        "path": "pages/component/view/index" //启动页面，必选
      }
    ]
  },
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "演示",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8",
    "usingComponents": {
      "collapse-tree-item": "/components/collapse-tree-item"
    },
    "renderingMode": "seperated", // 仅微信小程序，webrtc 无法正常时尝试强制关闭同层渲染
    "pageOrientation": "portrait", //横屏配置，全局屏幕旋转设置(仅 APP/微信/QQ小程序)，支持 auto / portrait / landscape
    "rpxCalcMaxDeviceWidth": 960,
    "rpxCalcBaseDeviceWidth": 375,
    "rpxCalcIncludeWidth": 750
  },
  "tabBar": {
    "color": "#7A7E83",
    "selectedColor": "#3cc51f",
    "borderStyle": "black",
    "backgroundColor": "#ffffff",
    "height": "50px",
    "fontSize": "10px",
    "iconWidth": "24px",
    "spacing": "3px",
    "iconfontSrc": "static/iconfont.ttf", // app tabbar 字体.ttf文件路径 app 3.4.4+
    "list": [
      {
        "pagePath": "pages/component/index",
        "iconPath": "static/image/icon_component.png",
        "selectedIconPath": "static/image/icon_component_HL.png",
        "text": "组件",
        "iconfont": {
          // 优先级高于 iconPath，该属性依赖 tabbar 根节点的 iconfontSrc
          "text": "\ue102",
          "selectedText": "\ue103",
          "fontSize": "17px",
          "color": "#000000",
          "selectedColor": "#0000ff"
        }
      },
      {
        "pagePath": "pages/API/index",
        "iconPath": "static/image/icon_API.png",
        "selectedIconPath": "static/image/icon_API_HL.png",
        "text": "接口"
      }
    ],
    "midButton": {
      "width": "80px",
      "height": "50px",
      "text": "文字",
      "iconPath": "static/image/midButton_iconPath.png",
      "iconWidth": "24px",
      "backgroundImage": "static/image/midButton_backgroundImage.png"
    }
  },
  "easycom": {
    "autoscan": true, //是否自动扫描组件
    "custom": {
      //自定义扫描规则
      "^uni-(.*)": "@/components/uni-$1.vue"
    }
  },
  "topWindow": {
    "path": "responsive/top-window.vue",
    "style": {
      "height": "44px"
    }
  },
  "leftWindow": {
    "path": "responsive/left-window.vue",
    "style": {
      "width": "300px"
    }
  },
  "rightWindow": {
    "path": "responsive/right-window.vue",
    "style": {
      "width": "300px"
    },
    "matchMedia": {
      "minWidth": 768
    }
  }
}
```


:::
### manifest.json

manifest.json 文件是应用的配置文件，用于指定应用的名称、图标、权限等内容。

以下是官网给出的配置示例：

::: details

```js
{
  "appid": "__UNI__XXXXXX，创建应用时云端分配的，不要修改。",
  "name": "应用名称，如uni-app",
  "description": "应用描述",
  "versionName": "1.0.0",
  "versionCode": "100",
  "uniStatistics": {
    "enable": false
  },
  "app-plus": {
    "allowsInlineMediaPlayback": true, //可选，Boolean类型, 是否允许 h5 中视频非全屏播放，3.8.5版本开始默认值为 true （仅iOS生效）
    "mediaPlaybackRequiresUserAction": false, //可选，Boolean类型,可通过此属性配置 h5中的音视频是否可通过API自动播放，注意当设置为 false 时允许API控制自动播放，3.8.5版本开始默认值为 false（仅iOS生效 3.0.1 + 版本支持）
    "nvueCompiler": "weex", //可选，字符串类型，nvue页面编译模式，可取值uni-app、weex，参考：https://ask.dcloud.net.cn/article/36074
    "nvueStyleCompiler": "weex", //可选，字符串类型，nvue页面样式编译模式，可取值uni-app、weex，参考：https://ask.dcloud.net.cn/article/38751
    "renderer": "native", //可选，字符串类型，可不加载基于 webview 的运行框架，可取值native
    "compilerVersion": 2, //可选，数字类型，编译器版本，可取值2、3，参考：https://ask.dcloud.net.cn/article/36599
    "nvueLaunchMode": "normal", //可选，字符串类型，nvue首页启动模式，compilerVersion值为3时生效，可取值normal、fast，参考：https://ask.dcloud.net.cn/article/36749
    "nvue": {
      //可选，JSON对象，nvue页面相关配置
      "flex-direction": "row" //可选，字符串类型，nvue页面的flex-direction默认值，可取值row、row-reverse、column、column-reverse
    },
    "optimization": {
      //可选，JSON对象，分包配置
      "subPackages": true //可选，Boolean类型，是否开启分包优化，参考：https://uniapp.dcloud.io/collocation/pages.html#subpackages
    },
    "uniStatistics": {
      //可选，JSON对象，uni统计配置
      "enable": true //可选，Boolean类型，是否开启uni统计
    },
    "screenOrientation": [
      //可选，字符串数组类型，应用支持的横竖屏
      "portrait-primary", //可选，字符串类型，支持竖屏
      "portrait-secondary", //可选，字符串类型，支持反向竖屏
      "landscape-primary", //可选，字符串类型，支持横屏
      "landscape-secondary" //可选，字符串类型，支持反向横屏
    ],
    "splashscreen": {
      //可选，JSON对象，splash界面配置
      "alwaysShowBeforeRender": true, //可选，Boolean类型，是否等待首页渲染完毕后再关闭启动界面
      "autoclose": true, //可选，Boolean类型，是否自动关闭启动界面
      "waiting": true, //可选，Boolean类型，是否在程序启动界面显示等待雪花
      "event": "loaded", //可选，字符串类型，可取值titleUpdate、rendering、loaded，uni-app项目已废弃
      "target": "defalt", //可选，字符串类型，可取值default、second，uni-app项目已废弃
      "dealy": 0, //可选，数字类型，延迟自动关闭启动时间，单位为毫秒，uni-app项目已废弃
      "ads": {
        //可选，JSON对象，开屏广告配置
        "backaground": "#RRGGBB", //可选，字符串类型，格式为#RRGGBB，开屏广告背景颜色
        "image": "" //可选，字符串类型，底部图片地址，相对应用资源目录路径
      },
      "androidTranslucent": false //可选，Boolean类型，使用“自定义启动图”启动界面时是否显示透明过渡界面，可解决点击桌面图标延时启动应用的效果
    },
    "modules": {
      //可选，JSON对象，使用的模块
      "Bluetooth": {
        //可选，JSON对象，Bluetooth(低功耗蓝牙)
        "description": "低功耗蓝牙"
      },
      "Contacts": {
        //可选，JSON对象，Contact(通讯录)
        "description": "通讯录"
      },
      "FaceID": {
        //可选，JSON对象，FaceID(人脸识别)，仅iOS支持
        "description": "人脸识别"
      },
      "Fingerprint": {
        //可选，JSON对象，Fingerprint(指纹识别)
        "description": "指纹识别"
      },
      "Geolocation": {
        //可选，JSON对象，Geolocation(定位)
        "description": "定位"
      },
      "iBeacon": {
        //可选，JSON对象，iBeacon
        "description": "iBeacon"
      },
      "LivePusher": {
        //可选，JSON对象，LivePusher(直播推流)
        "description": "直播推流"
      },
      "Maps": {
        //可选，JSON对象，Maps(地图)
        "description": "地图"
      },
      "Messaging": {
        //可选，JSON对象，Messaging(短彩邮件消息)
        "description": "短彩邮件消息"
      },
      "OAuth": {
        //可选，JSON对象，OAuth(登录鉴权)
        "description": "登录鉴权"
      },
      "Payment": {
        //可选，JSON对象，Payment(支付)
        "description": "iBeacon"
      },
      "Push": {
        //可选，JSON对象，Push(消息推送)
        "description": "iBeacon"
      },
      "Share": {
        //可选，JSON对象，Share(分享)
        "description": "iBeacon"
      },
      "Speech": {
        //可选，JSON对象，Speech(语音输入)
        "description": "iBeacon"
      },
      "Statistic": {
        //可选，JSON对象，Statistic(统计)
        "description": "iBeacon"
      },
      "SQLite": {
        //可选，JSON对象，SQLite(统计)
        "description": "iBeacon"
      },
      "VideoPlayer": {
        //可选，JSON对象，VideoPlayer(视频播放)
        "description": "iBeacon"
      },
      "Webview-x5": {
        //可选，JSON对象，Android X5 Webview(腾讯TBS)，仅Android支持
        "description": "iBeacon"
      },
      "UIWebview": {
        //可选，JSON对象，UIWebview，仅iOS支持
        "description": "iBeacon"
      }
    },
    "webView": {
      // 3.5.0 + 当系统webview低于指定版本时，会弹出提示。或者下载x5内核后继续启动，仅Android支持
      "minUserAgentVersion": "95.0.4638.75", // 最小webview版本
      "x5": {
        // 此属性需要勾选 Android X5 Webview 模块，详细参见下面的说明
        "timeOut": 3000, // 超时时间
        "showTipsWithoutWifi": true, // 是否在非WiFi网络环境时，显示用户确认下载x5内核的弹窗。
        "allowDownloadWithoutWiFi": false // 是否允许用户在非WiFi网络时进行x5内核的下载。（如果为true，就不会显示用户确认的弹窗。）
      }
    },
    "checkPermissionDenied": false, // 是否校验已拒绝权限 如果拒绝则不会再申请 默认false 不校验已拒绝权限
    "distribute": {
      //必选，JSON对象，云端打包配置
      "android": {
        //可选，JSON对象，Android平台云端打包配置
        "packagename": "", //必填，字符串类型，Android包名
        "keystore": "", //必填，字符串类型，Android签名证书文件路径
        "password": "", //必填，字符串类型，Android签名证书文件的密码
        "aliasname": "", //必填，字符串类型，Android签名证书别名
        "schemes": "", //可选，字符串类型，参考：https://uniapp.dcloud.io/tutorial/app-android-schemes
        "abiFilters": [
          //可选，字符串数组类型，参考：https://uniapp.dcloud.io/tutorial/app-android-abifilters
          "armeabi-v7a",
          "arm64-v8a",
          "x86",
          "x86_64"
        ],
        "permissions": [
          //可选，字符串数组类型，Android权限配置
          "<uses-feature android:name=\"android.hardware.camera\"/>"
        ],
        "custompermissions": false, //可选，Boolean类型，是否自定义Android权限配置
        "permissionExternalStorage": {
          //可选，JSON对象，Android平台应用启动时申请读写手机存储权限策略
          "request": "always", //必填，字符串类型，申请读写手机存储权限策略，可取值none、once、always
          "prompt": "" //可选，字符串类型，当request设置为always值用户拒绝时弹出提示框上的内容
        },
        "permissionPhoneState": {
          //可选，JSON对象，Android平台应用启动时申请读取设备信息权限配置
          "request": "always", //必填，字符串类型，申请读取设备信息权限策略，可取值none、once、always
          "prompt": "" //可选，字符串类型，当request设置为always值用户拒绝时弹出提示框上的内容
        },
        "minSdkVersion": 21, //可选，数字类型，Android平台最低支持版本，参考：https://uniapp.dcloud.io/tutorial/app-android-minsdkversion
        "targetSdkVersion": 30, //可选，数字类型，Android平台目标版本，参考：https://uniapp.dcloud.io/tutorial/app-android-targetsdkversion
        "packagingOptions": [
          //可选，字符串数组类型，Android平台云端打包时build.gradle的packagingOptions配置项
          "doNotStrip '*/armeabi-v7a/*.so'",
          "merge '**/LICENSE.txt'"
        ],
        "jsEngine": "v8", //可选，字符串类型，uni-app使用的JS引擎，可取值v8、jsc
        "debuggable": false, //可选，Boolean类型，是否开启Android调试开关
        "locale": "default", //可选，应用的语言
        "forceDarkAllowed": false, //可选，Boolean类型，是否强制允许暗黑模式
        "resizeableActivity": false, //可选，Boolean类型，是否支持分屏调整窗口大小
        "hasTaskAffinity": false, //可选，Boolean类型，是否设置android：taskAffinity
        "buildFeatures": {
          //（HBuilderX3.5.0+版本支持）可选，JSON对象，Android平台云端打包时build.gradle的buildFeatures配置项
          "dataBinding": false, //可选，Boolean类型，是否设置dataBinding
          "viewBinding": false //可选，Boolean类型，是否设置viewBinding
        }
      },
      "ios": {
        //可选，JSON对象，iOS平台云端打包配置
        "appid": "", //必填，字符串类型，iOS平台Bundle ID
        "mobileprovision": "", //必填，字符串类型，iOS打包使用的profile文件路径
        "p12": "", //必填，字符串类型，iOS打包使用的证书文件路径
        "password": "", //必填，字符串类型，iOS打包使用的证书密码
        "devices": "iphone", //必填，字符串类型，iOS支持的设备类型，可取值iphone、ipad、universal
        "urlschemewhitelist": "baidumap", //可选，字符串类型，应用访问白名单列表，参考：https://uniapp.dcloud.io/tutorial/app-ios-schemewhitelist
        "urltypes": "", //可选，字符串类型，参考：https://uniapp.dcloud.io/tutorial/app-ios-schemes
        "UIBackgroundModes": "audio", //可选，字符串类型，应用后台运行模式，参考：https://uniapp.dcloud.io/tutorial/app-ios-uibackgroundmodes
        "frameworks": [
          //可选，字符串数组类型，依赖的系统库，已废弃，推荐使用uni原生插件扩展使用系统依赖库
          "CoreLocation.framework"
        ],
        "deploymentTarget": "10.0", //可选，字符串类型，iOS支持的最低版本
        "privacyDescription": {
          //可选，JSON对象，iOS隐私信息访问的许可描述
          "NSPhotoLibraryUsageDescription": "", //可选，字符串类型，系统相册读取权限描述
          "NSPhotoLibraryAddUsageDescription": "", //可选，字符串类型，系统相册写入权限描述
          "NSCameraUsageDescription": "", //可选，字符串类型，摄像头使用权限描述
          "NSMicrophoneUsageDescription": "", //可选，字符串类型，麦克风使用权限描述
          "NSLocationWhenInUseUsageDescription": "", //可选，字符串类型，运行期访问位置权限描述
          "NSLocationAlwaysUsageDescription": "", //可选，字符串类型，后台运行访问位置权限描述
          "NSLocationAlwaysAndWhenInUseUsageDescription": "", //可选，字符串类型，运行期后后台访问位置权限描述
          "NSCalendarsUsageDescription": "", //可选，字符串类型，使用日历权限描述
          "NSContactsUsageDescription": "", //可选，字符串类型，使用通讯录权限描述
          "NSBluetoothPeripheralUsageDescription": "", //可选，字符串类型，使用蓝牙权限描述
          "NSBluetoothAlwaysUsageDescription": "", //可选，字符串类型，后台使用蓝牙权限描述
          "NSSpeechRecognitionUsageDescription": "", //可选，字符串类型，系统语音识别权限描述
          "NSRemindersUsageDescription": "", //可选，字符串类型，系统提醒事项权限描述
          "NSMotionUsageDescription": "", //可选，字符串类型，使用运动与健康权限描述
          "NSHealthUpdateUsageDescription": "", //可选，字符串类型，使用健康更新权限描述
          "NSHealthShareUsageDescription": "", //可选，字符串类型，使用健康分享权限描述
          "NSAppleMusicUsageDescription": "", //可选，字符串类型，使用媒体资料库权限描述
          "NFCReaderUsageDescription": "", //可选，字符串类型，使用NFC权限描述
          "NSHealthClinicalHealthRecordsShareUsageDescription": "", //可选，字符串类型，访问临床记录权限描述
          "NSHomeKitUsageDescription": "", //可选，字符串类型，访问HomeKit权限描述
          "NSSiriUsageDescription": "", //可选，字符串类型，访问Siri权限描述
          "NSFaceIDUsageDescription": "", //可选，字符串类型，使用FaceID权限描述
          "NSLocalNetworkUsageDescription": "", //可选，字符串类型，访问本地网络权限描述
          "NSUserTrackingUsageDescription": "" //可选，字符串类型，跟踪用户活动权限描述
        },
        "idfa": true, //可选，Boolean类型，是否使用广告标识
        "capabilities": {
          //可选，JSON对象，应用的能力配置（Capabilities）
        },
        "CFBundleName": "HBuilder", //可选，字符串类型，CFBundleName名称
        "validArchitectures": [
          //可选，字符串数组类型，编译时支持的CPU指令，可取值arm64、arm64e、armv7、armv7s、x86_64
          "arm64"
        ],
        "pushRegisterMode": "manual", //可选，使用“Push(消息推送)”模块时申请系统推送权限模式，manual表示调用push相关API时申请，其它值表示应用启动时自动申请
        "privacyRegisterMode": "manual" //可选，仅iOS有效，设置为manual表示用户同意隐私政策后才获取idfv，设置为其它值表示应用启动时自动获取
      },
      "sdkConfigs": {
        //可选，JSON对象，三方SDK相关配置
        "geolocation": {
          //可选，JSON对象，Geolocation(定位)模块三方SDK配置
          "system": {
            //可选，JSON对象，使用系统定位
            "__platform__": ["ios", "android"] //可选，字符串数组类型，支持的平台
          },
          "amap": {
            //可选，JSON对象，使用高德定位SDK配置
            "__platform__": ["ios", "android"], //可选，字符串数组类型，支持的平台
            "appkey_ios": "", //必填，字符串类型，iOS平台高德定位appkey
            "appkey_android": "" //必填，字符串类型，Android平台高德定位appkey
          },
          "baidu": {
            //可选，JSON对象，使用百度定位SDK配置
            "__platform__": ["ios", "android"], //可选，字符串数组类型，支持的平台
            "appkey_ios": "", //必填，字符串类型，iOS平台百度定位appkey
            "appkey_android": "" //必填，字符串类型，Android平台百度定位appkey
          }
        },
        "maps": {
          //可选，JSON对象，Maps(地图)模块三方SDK配置
          "amap": {
            //可选，JSON对象，使用高德地图SDK配置
            "appkey_ios": "", //必填，字符串类型，iOS平台高德地图appkey
            "appkey_android": "" //必填，字符串类型，Android平台高德地图appkey
          },
          "baidu": {
            //可选，JSON对象，使用百度地图SDK配置
            "appkey_ios": "", //必填，字符串类型，iOS平台百度地图appkey
            "appkey_android": "" //必填，字符串类型，Android平台百度地图appkey
          },
          "google": {
            //可选，JSON对象，使用Google地图SDK配置
            "APIKey_ios": "", //必填，字符串类型，iOS平台Google地图APIKey
            "APIKey_android": "" //必填，字符串类型，Android平台Google地图APIKey
          }
        },
        "oauth": {
          //可选，JSON对象，OAuth(登录鉴权)模块三方SDK配置
          "univerify": {
            //可选，JSON对象，使用一键登录(univerify)SDK配置，无需手动配置参数，云端打包自动获取配置参数
          },
          "apple": {
            //可选，JSON对象，使用苹果登录(Sign in with Apple)SDK配置，无配置参数，仅iOS平台支持
          },
          "weixin": {
            //可选，JSON对象，使用微信登录SDK配置
            "appid": "", //必填，字符串类型，微信开放平台申请的appid
            "appsecret": "", //必填，字符串类型，微信开放平台申请的appsecret
            "UniversalLinks": "" //可选，字符串类型，微信开放平台配置的iOS平台通用链接
          },
          "qq": {
            //可选，JSON对象，使用QQ登录SDK配置
            "appid": "", //必填，字符串类型，QQ开放平台申请的appid
            "UniversalLinks": "" //可选，字符串类型，QQ开放平台配置的iOS平台通用链接
          },
          "sina": {
            //可选，JSON对象，使用新浪微博登录SDK配置
            "appkey": "", //必填，字符串类型，新浪微博开放平台申请的appid
            "redirect_uri": "", //必填，字符串类型，新浪微博开放平台配置的redirect_uri
            "UniversalLinks": "" //可选，字符串类型，新浪微博开放平台配置的iOS平台通用链接
          },
          "google": {
            //可选，JSON对象，使用Google登录SDK配置
            "clientid": "" //必填，字符串类型，Google开发者后台申请的clientid
          },
          "facebook": {
            //可选，JSON对象，使用Facebook登录SDK配置
            "appid": "" //必填，字符串类型，Facebook开发者后台申请的appid
          }
        },
        "payment": {
          //可选，JSON对象，Payment(支付)模块三方SDK配置
          "appleiap": {
            //可选，JSON对象，使用Apple应用内支付配置，无配置参数，仅iOS平台支持
          },
          "alipay": {
            //可选，JSON对象，使用支付宝支付SDK配置
            "__platform__": ["ios", "android"] //可选，字符串数组类型，支持的平台
          },
          "weixin": {
            //可选，JSON对象，使用微信支付SDK配置
            "__platform__": ["ios", "android"], //可选，字符串数组类型，支持的平台
            "appid": "", //必填，字符串类型，微信开放平台申请的appid
            "UniversalLinks": "" //可选，字符串类型，微信开放平台配置的iOS平台通用链接
          },
          "paypal": {
            //可选，JSON对象，使用paypal支付SDK配置
            "__platform__": ["ios", "android"], //可选，字符串数组类型，支持的平台
            "returnURL_ios": "", //必填，字符串类型，paypa开发者者后台配置的iOS平台returnURL
            "returnURL_android": "" //必填，字符串类型，paypa开发者者后台配置的Android平台returnURL
          },
          "stripe": {
            //可选，JSON对象，使用stripe支付SDK配置
            "__platform__": ["ios", "android"], //可选，字符串数组类型，支持的平台
            "returnURL_ios": "" //必填，字符串类型，stripe开发者者后台配置的iOS平台returnURL
          },
          "google": {
            //可选，JSON对象，使用google支付SDK配置，无配置参数，仅Android平台支持
          }
        },
        "push": {
          //可选，JSON对象，Push(消息推送)模块三方SDK配置
          "unipush": {
            //可选，JSON对象，使用UniPush SDK配置，无需手动配置参数，云端打包自动获取配置参数
            "icons": {
              //可选，JSON对象，推送图标配置
              "push": {
                //可选，JSON对象，Push图标配置
                "ldpi": "", //可选，字符串类型，普通屏设备推送图标路径，分辨率要求48x48
                "mdpi": "", //可选，字符串类型，大屏设备设备推送图标路径，分辨率要求48x48
                "hdpi": "", //可选，字符串类型，高分屏设备推送图标路径，分辨率要求72x72
                "xdpi": "", //可选，字符串类型，720P高分屏设备推送图标路径，分辨率要求96x96
                "xxdpi": "", //可选，字符串类型，1080P高密度屏幕推送图标路径，分辨率要求144x144
                "xxxdpi": "" //可选，字符串类型，4K屏设备推送图标路径，分辨率要求192x192
              },
              "smal": {
                //可选，JSON对象，Push小图标配置
                "ldpi": "", //可选，字符串类型，普通屏设备推送小图标路径，分辨率要求18x18
                "mdpi": "", //可选，字符串类型，大屏设备设备推送小图标路径，分辨率要求24x24
                "hdpi": "", //可选，字符串类型，高分屏设备推送小图标路径，分辨率要求36x36
                "xdpi": "", //可选，字符串类型，720P高分屏设备推送小图标路径，分辨率要求48x48
                "xxdpi": "", //可选，字符串类型，1080P高密度屏幕推送小图标路径，分辨率要求72x72
                "xxxdpi": "" //可选，字符串类型，4K屏设备推送小图标路径，分辨率要求96x96
              }
            }
          },
          "igexin": {
            //可选，JSON对象，使用个推推送SDK配置，**已废弃，推荐使用UniPush，UniPush是个推推送VIP版，功能更强大**
            "appid": "", //必填，字符串类型，个推开放平台申请的appid
            "appkey": "", //必填，字符串类型，个推开放平台申请的appkey
            "appsecret": "", //必填，字符串类型，个推开放平台申请的appsecret
            "icons": {
              //可选，JSON对象，推送图标配置
              "push": {
                //可选，JSON对象，Push图标配置
                "ldpi": "", //可选，字符串类型，普通屏设备推送图标路径，分辨率要求48x48
                "mdpi": "", //可选，字符串类型，大屏设备设备推送图标路径，分辨率要求48x48
                "hdpi": "", //可选，字符串类型，高分屏设备推送图标路径，分辨率要求72x72
                "xdpi": "", //可选，字符串类型，720P高分屏设备推送图标路径，分辨率要求96x96
                "xxdpi": "", //可选，字符串类型，1080P高密度屏幕推送图标路径，分辨率要求144x144
                "xxxdpi": "" //可选，字符串类型，4K屏设备推送图标路径，分辨率要求192x192
              },
              "smal": {
                //可选，JSON对象，Push小图标配置
                "ldpi": "", //可选，字符串类型，普通屏设备推送小图标路径，分辨率要求18x18
                "mdpi": "", //可选，字符串类型，大屏设备设备推送小图标路径，分辨率要求24x24
                "hdpi": "", //可选，字符串类型，高分屏设备推送小图标路径，分辨率要求36x36
                "xdpi": "", //可选，字符串类型，720P高分屏设备推送小图标路径，分辨率要求48x48
                "xxdpi": "", //可选，字符串类型，1080P高密度屏幕推送小图标路径，分辨率要求72x72
                "xxxdpi": "" //可选，字符串类型，4K屏设备推送小图标路径，分辨率要求96x96
              }
            }
          }
        },
        "share": {
          //可选，JSON对象，Share(分享)模块三方SDK配置
          "weixin": {
            //可选，JSON对象，使用微信分享SDK配置
            "appid": "", //必填，字符串类型，微信开放平台申请的appid
            "UniversalLinks": "" //可选，字符串类型，微信开放平台配置的iOS平台通用链接
          },
          "qq": {
            //可选，JSON对象，使用QQ分享SDK配置
            "appid": "", //必填，字符串类型，QQ开放平台申请的appid
            "UniversalLinks": "" //可选，字符串类型，QQ开放平台配置的iOS平台通用链接
          },
          "sina": {
            //可选，JSON对象，使用新浪微博分享SDK配置
            "appkey": "", //必填，字符串类型，新浪微博开放平台申请的appid
            "redirect_uri": "", //必填，字符串类型，新浪微博开放平台配置的redirect_uri
            "UniversalLinks": "" //可选，字符串类型，新浪微博开放平台配置的iOS平台通用链接
          }
        },
        "speech": {
          //可选，JSON对象，Speech(语音识别)模块三方SDK配置
          "baidu": {
            //可选，JSON对象，使用百度语音识别SDK配置
            "appid": "", //必填，字符串类型，百度开放平台申请的appid
            "apikey": "", //必填，字符串类型，百度开放平台申请的apikey
            "secretkey": "" //必填，字符串类型，百度开放平台申请的secretkey
          }
        },
        "statics": {
          //可选，JSON对象，Statistic(统计)模块三方SDK配置
          "umeng": {
            //可选，JSON对象，使用友盟统计SDK配置
            "appkey_ios": "", //必填，字符串类型，友盟统计开放平台申请的iOS平台appkey
            "channelid_ios": "", //可选，字符串类型，友盟统计iOS平台的渠道标识
            "appkey_android": "", //必填，字符串类型，友盟统计开放平台申请的Android平台appkey
            "channelid_android": "" //可选，字符串类型，友盟统计Android平台的渠道标识
          },
          "google": {
            //可选，JSON对象，使用Google Analytics for Firebase配置
            "config_ios": "", //必填，字符串类型，Google Firebase统计开发者后台获取的iOS平台配置文件路径
            "config_android": "" //必填，字符串类型，Google Firebase统计开发者后台获取的Android平台配置文件路径
          }
        },
        "ad": {
          //可选，JSON对象，uni-AD配置
          "360": {
            //可选，JSON对象，使用360广告联盟SDK，无需手动配置，在uni-AD后台申请开通后自动获取配置参数
          },
          "csj": {
            //可选，JSON对象，使用今日头条穿山甲广告联盟SDK，无需手动配置，在uni-AD后台申请开通后自动获取配置参数
          },
          "gdt": {
            //可选，JSON对象，使用腾讯优量汇广告联盟SDK，无需手动配置，在uni-AD后台申请开通后自动获取配置参数
          },
          "ks": {
            //可选，JSON对象，使用快手广告联盟SDK，无需手动配置，在uni-AD后台申请开通后自动获取配置参数
          },
          "ks-content": {
            //可选，JSON对象，使用快手内容联盟SDK，无需手动配置，在uni-AD后台申请开通后自动获取配置参数
          },
          "sigmob": {
            //可选，JSON对象，使用Sigmob广告联盟SDK，无需手动配置，在uni-AD后台申请开通后自动获取配置参数
          },
          "hw": {
            //可选，JSON对象，使用华为广告联盟SDK，无需手动配置，在uni-AD后台申请开通后自动获取配置参数
          },
          "bd": {
            //可选，JSON对象，使用百度百青藤广告联盟SDK，无需手动配置，在uni-AD后台申请开通后自动获取配置参数
          },
          "BXM-AD": {
            //可选，JSON对象，使用互动游戏(变现猫)SDK，无需手动配置，在uni-AD后台申请开通后自动获取配置参数
          }
        }
      },
      "icons": {
        //可选，JSON对象，应用图标相关配置
        "ios": {
          //可选，JSON对象，iOS平台图标配置
          "appstore": "", //必填，字符串类型，分辨率1024x1024, 提交app sotre使用的图标路径
          "iphone": {
            //可选，JSON对象，iPhone设备图标配置
            "app@2x": "", //可选，字符串类型，分辨率120x120，程序图标路径
            "app@3x": "", //可选，字符串类型，分辨率180x180，程序图标路径
            "spotlight@2x": "", //可选，字符串类型，分辨率80x80，Spotlight搜索图标路径
            "spotlight@3x": "", //可选，字符串类型，分辨率120x120，Spotlight搜索图标路径
            "settings@2x": "", //可选，字符串类型，分辨率58x58，Settings设置图标路径
            "settings@3x": "", //可选，字符串类型，分辨率87x87，Settings设置图标路径
            "notification@2x": "", //可选，字符串类型，分辨率40x40，通知栏图标路径
            "notification@3x": "" //可选，字符串类型，分辨率60x60，通知栏图标路径
          },
          "ipad": {
            //可选，JSON对象，iPad设备图标配置
            "app": "", //可选，字符串类型，分辨率76x76，程序图标图标路径
            "app@2x": "", //可选，字符串类型，分辨率152x152，程序图标图标路径
            "proapp@2x": "", //可选，字符串类型，分辨率167x167，程序图标图标路径
            "spotlight": "", //可选，字符串类型，分辨率40x40，Spotlight搜索图标路径
            "spotlight@2x": "", //可选，字符串类型，分辨率80x80，Spotlight搜索图标路径
            "settings": "", //可选，字符串类型，分辨率29x29，Settings设置图标路径
            "settings@2x": "", //可选，字符串类型，分辨率58x58，Settings设置图标路径
            "notification": "", //可选，字符串类型，分辨率20x20，通知栏图标路径
            "notification@2x": "" //可选，字符串类型，分辨率740x40，通知栏图标路径
          }
        },
        "android": {
          //可选，JSON对象，Android平台图标配置
          "ldpi": "", //可选，字符串类型，普通屏设备程序图标，分辨率要求48x48，已废弃
          "mdpi": "", //可选，字符串类型，大屏设备程序图标，分辨率要求48x48，已废弃
          "hdpi": "", //可选，字符串类型，高分屏设备程序图标，分辨率要求72x72
          "xhdpi": "", //可选，字符串类型，720P高分屏设备程序图标，分辨率要求96x96
          "xxhdpi": "", //可选，字符串类型，1080P高分屏设备程序图标，分辨率要求144x144
          "xxxhdpi": "" //可选，字符串类型，2K屏设备程序图标，分辨率要求192x192
        }
      },
      "splashscreen": {
        //可选，JSON对象，启动界面配置
        "iosStyle": "common", //可选，字符串类型，iOS平台启动界面样式，可取值common、default、storyboard
        "ios": {
          //可选，JSON对象，iOS平台启动界面配置
          "storyboard": "", //可选，字符串类型，自定义storyboard启动界面文件路径，iosStyle值为storyboard时生效
          "iphone": {
            //可选，JSON对象，iPhone设备启动图配置，iosStyle值为default时生效
            "default": "", //可选，字符串类型，分辨率320x480，iPhone3（G/GS）启动图片路径，已废弃
            "retina35": "", //可选，字符串类型，分辨率640x960，3.5英寸设备(iPhone4/4S)启动图片路径，已废弃
            "retina40": "", //可选，字符串类型，分辨率640x1136，4.0英寸设备(iPhone5/5S)启动图片路径
            "retina40l": "", //可选，字符串类型，分辨率1136x640，4.0英寸设备(iPhone5/5S)横屏启动图片路径
            "retina47": "", //可选，字符串类型，分辨率750x1334，4.7英寸设备（iPhone6/7/8）启动图片路径
            "retina47l": "", //可选，字符串类型，分辨率1334x750，4.7英寸设备（iPhone6/7/8）横屏启动图片路径
            "retina55": "", //可选，字符串类型，分辨率1242x2208，5.5英寸设备（iPhone6/7/8Plus）启动图片路径
            "retina55l": "", //可选，字符串类型，分辨率2208x1242，5.5英寸设备（iPhone6/7/8Plus）横屏启动图片路径
            "iphonex": "", //可选，字符串类型，分辨率1125x2436，5.8英寸设备（iPhoneX/XS）启动图片路径
            "iphonexl": "", //可选，字符串类型，分辨率2436x1125，5.8英寸设备（iPhoneX/XS）横屏启动图片路径
            "portrait-896h@2x": "", //可选，字符串类型，分辨率828x1792，6.1英寸设备（iPhoneXR）启动图片路径
            "landscape-896h@2x": "", //可选，字符串类型，分辨率1792x828，6.1英寸设备（iPhoneXR）iPhoneXR横屏启动图片路径
            "portrait-896h@3x": "", //可选，字符串类型，分辨率1242x2688，6.5英寸设备（iPhoneXS Max）启动图片路径
            "landscape-896h@3x": "" //可选，字符串类型，分辨率2688x1242，6.5英寸设备（iPhoneXS Max）横屏启动图片路径
          },
          "ipad": {
            //可选，JSON对象，iPad设备启动图配置，iosStyle值为default时生效
            "portrait": "", //可选，字符串类型，分辨率768x1004，iPad竖屏启动图片路径，已废弃
            "portrait-retina": "", //可选，字符串类型，分辨率1536x2008，iPad高分屏竖屏启动图片路径，已废弃
            "landscape": "", //可选，字符串类型，分辨率1024x748，iPad横屏启动图片路径，已废弃
            "landscape-retina": "", //可选，字符串类型，分辨率2048x1496，iPad高分屏横屏启动图片路径，已废弃
            "portrait7": "", //可选，字符串类型，分辨率768x1024，9.7/7.9英寸iPad/mini竖屏启动图片路径
            "landscape7": "", //可选，字符串类型，分辨率1024x768，9.7/7.9英寸iPad/mini横屏启动图片路径
            "portrait-retina7": "", //可选，字符串类型，分辨率1536x2048，9.7/7.9英寸iPad/mini高分屏竖屏图片路径
            "landscape-retina7": "", //可选，字符串类型，分辨率2048x1536，9.7/7.9英寸iPad/mini高分屏横屏启动图片路径
            "portrait-1112h@2x": "", //可选，字符串类型，分辨率1668x2224，10.5英寸iPad Pro竖屏启动图片路径
            "landscape-1112h@2x": "", //可选，字符串类型，分辨率2224x1668，10.5英寸iPad Pro横屏启动图片路径
            "portrait-1194h@2x": "", //可选，字符串类型，分辨率1668x2388，11英寸iPad Pro竖屏启动图片路径
            "landscape-1194h@2x": "", //可选，字符串类型，分辨率2388x1668，11英寸iPad Pro横屏启动图片路径
            "portrait-1366h@2x": "", //可选，字符串类型，分辨率2048x2732，12.9英寸iPad Pro竖屏启动图片路径
            "landscape-1366h@2x": "" //可选，字符串类型，分辨率2732x2048，12.9英寸iPad Pro横屏启动图片路径
          }
        },
        "androidStyle": "common", //可选，字符串类型，Android平台启动界面样式，可取值common、default
        "android": {
          //可选，JSON对象，Android平台启动图片配置， androidStyle值为default时生效
          "ldpi": "", //可选，字符串类型，分辨率320x442，低密度屏幕启动图片路径，已废弃
          "mdpi": "", //可选，字符串类型，分辨率240x282，中密度屏幕启动图片路径，已废弃
          "hdpi": "", //可选，字符串类型，分辨率480x762，高密度屏幕启动图片路径
          "xhdpi": "", //可选，字符串类型，分辨率720x1242，720P高密度屏幕启动图片路径
          "xxhdpi": "" //可选，字符串类型，分辨率1080x1882，1080P高密度屏幕启动图片路径
        }
      },
      "orientation": [
        //可选，字符串数组类型，应用支持的横竖屏，**已废弃，使用screenOrientation配置**
        "portrait-primary",
        "portrait-secondary",
        "landscape-primary",
        "landscape-secondary"
      ]
    },
    "compatible": {
      //可选，JSON对象，uni-app兼容模式
      "ignoreVersion": false, //可选，Boolean类型，是否忽略版本兼容检查提示
      "runtimeVersion": "", //可选，字符串类型，兼容的uni-app运行环境版本号，多个版本使用,分割
      "compilerVersion": "" //可选，字符串类型，兼容的编译器版本号
    },
    "confusion": {
      //可选，JSON对象，原生混淆加密配置，参考：https://uniapp.dcloud.io/tutorial/app-sec-confusion
      "description": "", //可选，字符串类型，原生混淆描述
      "resources": {
        //必填，JSON对象，原生混淆文件配置
        "js/common.js": {
          //可选，JSON对象，键名为需要原生混淆的文件路径
        }
      }
    },
    "channel": "", //可选，字符串类型，渠道标识
    "cers": {
      //可选，JSON对象，应用的异常崩溃与错误报告系统配置
      "crash": true //可选，Boolean类型，是否提交应用异常崩溃信息
    },
    "cache": {
      //可选，JSON对象，Webview窗口默认使用的缓存模式，uni-app项目已废弃
      "mode": "default" //可选，字符串类型，可取值default、cacheElseNetwork、noCache、cacheOnly
    },
    "error": {
      //可选，JSON对象，页面加载错误配置，uni-app项目仅对webview组件有效，参考：https://uniapp.dcloud.io/tutorial/app-webview-error
      "url": "" //必填，字符串类型，webview页面错误是跳转的页面地址
    },
    "kernel": {
      //可选，JSON对象，webview内核配置
      "ios": "WKWebview", //可选，iOS平台使用的webview类型，可取值WKWebview、UIWebview
      "recovery": "reload" //可选，iOS平台使用WKWebview时，内核崩溃后的处理逻辑，可取值restart、reload、none
    },
    "launchwebview": {
      //可选，JSON对象，应用首页相关配置，uni-app项目不建议手动修改
      "plusrequire": "normal", //可选，字符串类型，加载plus API时机，可取值ahead、normal、later、none
      "injection": false, //可选，Boolean类型，是否提前注入plus API
      "overrideresource": [
        //可选，JSON对象数组，应用首页的拦截资源相关配置
        {
          "match": "", //可选，字符串类型，匹配拦截的资源url地址的正则表达式
          "redirect": "", //可选，字符串类型，拦截资源的重定向地址
          "mime": "", //可选，字符串类型，拦截资源的数据类型mime
          "encoding": "", //可选，字符串类型，拦截资源的数据编码
          "header": {
            //可选，JSON对象，拦截资源的http头数据
          }
        }
      ],
      "overrideurl": {
        //可选，JSON对象，应用首页的拦截链接请求处理逻辑
        "mode": "reject", //可选，字符串类型，拦截模式，可取值allow、reject
        "match": "", //可选，字符串类型，匹配拦截规则，支持正则表达式
        "exclude": "none" //可选，字符串类型，排除拦截理规则，可取值none、redirect
      },
      "replacewebapi": {
        //可选，JSON对象，是否重写Web API实现相关配置
        "geolocation": "none" //可选，字符串类型，重写标准定位API，可取值none、alldevice、auto
      },
      "subNViews": [
        //可选，JSON对象数组，首页原生View相关配置，已废弃
        {
          "id": "", //可选，字符串类型，原生View标识
          "styles": {
            //可选，JSON对象，原生View样式
          },
          "tags": [
            //可选，JSON对象数组，原生View中包含的tag标签列表
            {}
          ]
        }
      ],
      "titleNView": {
        //可选，JSON对象，标题栏相关配置
        "backgroundColor": "#RRGGBB", //可选，字符串类型，#RRGGBB格式，标题栏背景颜色
        "titleText": "", //可选，字符串类型，标题栏标题文字内容
        "titleColor": "#RRGGBB", //可选，字符串类型，#RRGGBB格式，标题栏标题文字颜色
        "titleSize": "17px", //可选，字符串类型，标题字体大小，默认大小为17px
        "autoBackButton": true, //可选，Boolean类型，是否显示标题栏上返回键
        "backButton": {
          //可选，JSON对象，返回键样式
          "backgournd": "#RRGGBB", //可选，字符串类型，#RRGGBB格式，返回按钮背景颜色
          "color": "#RRGGBB", //可选，字符串类型，#RRGGBB格式，返回图标颜色
          "colorPressed": "#RRGGBB" //可选，字符串类型，#RRGGBB，返回图标按下时的颜色
        },
        "buttons": [
          //可选，JSON对象数组，标题栏按钮配置
          {
            "color": "#RRGGBB", //可选，字符串类型，#RRGGBB格式，按钮上的文字颜色
            "colorPressed": "#RRGGBB", //可选，字符串类型，#RRGGBB格式，按钮按下状态的文字颜色
            "float": "right", //可选，字符串类型，按钮显示位置，可取值left、right
            "fontWeight": "normal", //可选，字符串类型，按钮上文字的粗细，可取值normal、bold
            "fontSize": "22px", //可选，字符串类型，按钮上文字的大小
            "fontSrc": "", //可选，字符串类型，按钮上文字使用的字体文件路径
            "text": "" //可选，字符串类型，按钮上显示的文字
          }
        ],
        "splitLine": {
          //可选，JSON对象，标题栏分割线样式
          "color": "#RRGGBB", //可选，字符串类型，#RRGGBB格式，分割线颜色
          "height": "1px" //可选，字符串类型，分割线高度
        }
      },
      "statusbar": {
        //可选，JSON对象，状态栏配置
        "background": "#RRGGBB" //可选，字符串类型，#RRGGBB格式，沉浸式状态栏样式下系统状态栏背景颜色
      },
      "top": "0px", //可选，字符串类型，Webview的顶部偏移量，支持px、%单位
      "height": "100%", //可选，字符串类型，Webview窗口高度，支持px、%单位
      "bottom": "0px", //可选，字符串类型，Webview的底部偏移量，仅在未同时设置top和height属性时生效
      "backButtonAutoControl": "none", //可选，字符串类型，运行环境自动处理返回键的控制逻辑，可取值none、hide、close
      "additionalHttpHeaders": {
        //可选，JSON对象，额外添加HTTP请求头数据
      }
    },
    "nativePlugins": {
      //可选，JSON数组对象，uni原生插件配置，参考：https://nativesupport.dcloud.net.cn/NativePlugin/use/use_local_plugin
      "%UniPlugin-ID%": {
        //可选，JSON对象，键名为插件标识，值为插件配置参数
      }
    },
    "popGesture": "none", //可选，字符串类型，窗口侧滑返回默认效果，可取值none、close、hide
    "runmode": "liberate", //可选，字符串类型，应用资源运行模式，可取值normal、liberate
    "safearea": {
      //可选，JSON对象，安全区域配置
      "background": "#RRGGBB", //可选，字符串类型，#RRGGBB格式，安全区域背景颜色
      "backgroundDark": "#RRGGBB", //可选，字符串类型，#RRGGBB格式，暗黑模式安全区域背景颜色
      "bottom": {
        //可选，JSON对象，底部安全区域配置
        "offset": "none" //可选，字符串类型，安全区域偏移值，可取值auto、none
      },
      "left": {
        //可选，JSON对象，左侧安全区域配置
        "offset": "none" //可选，字符串类型，安全区域偏移值，可取值auto、none
      },
      "right": {
        //可选，JSON对象，左侧安全区域配置
        "offset": "none" //可选，字符串类型，安全区域偏移值，可取值auto、none
      }
    },
    "softinput": {
      //可选，JSON对象，软键盘相关配置
      "navBar": "auto", //可选，字符串类型，iOS平台软键盘上导航条的显示模式，可取值auto、none
      "auxiliary": false, //可选，Boolean类型，是否开启辅助输入功能
      "mode": "adjustResize" //可选，字符串类型，弹出系统软键盘模式，可取值adjustResize、adjustPan
    },
    "ssl": {
      //可选，JSON对象，ssl相关设置
      "untrustedca": "accept" //可选，字符串类型，https请求时服务器非受信证书的处理逻辑，可取值accept、refuse、warning
    },
    "statusbar": {
      //可选，JSON对象，应用启动后的系统状态栏相关配置
      "immersed": "none", //可选，字符串类型，沉浸式状态栏样式，可取值none、suggestedDevice、supportedDevice
      "style": "light", //可选，字符串类型，系统状态栏样式（前景颜色），可取值dark、light
      "background": "#RRGGBB" //可选，字符串类型，#RRGGBB格式，系统状态栏背景颜色
    },
    "useragent": {
      //可选，JSON对象，应用UserAgent相关配置，默认值为系统UserAgent，并添加 uni-app Html5Plus/1.0
      "value": "", //可选，字符串类型，设置的默认userAgent值
      "concatenate": false //可选，Boolean类型，是否将value值作为追加值连接到系统默认userAgent值之后
    },
    "useragent_android": {
      //可选，JSON对象，Android平台应用UserAgent相关配置，优先级高于useragent配置
      "value": "", //可选，字符串类型，设置的默认userAgent值
      "concatenate": false //可选，Boolean类型，是否将value值作为追加值连接到系统默认userAgent值之后
    },
    "useragent_ios": {
      //可选，JSON对象，iOS平台应用UserAgent相关配置，优先级高于useragent配置
      "value": "", //可选，字符串类型，设置的默认userAgent值
      "concatenate": false //可选，Boolean类型，是否将value值作为追加值连接到系统默认userAgent值之后
    }
  },
  "quickapp": {},
  "mp-weixin": {
    "appid": "wx开头的微信小程序appid",
    "uniStatistics": {
      "enable": false
    }
  },
  "mp-baidu": {
    "appid": "百度小程序appid"
  },
  "mp-toutiao": {
    "appid": "抖音小程序appid"
  },
  "mp-lark": {
    "appid": "飞书小程序appid"
  },
  "h5": {
    "title": "演示",
    "template": "index.html",
    "router": {
      "mode": "history",
      "base": "/hello/"
    },
    "async": {
      "loading": "AsyncLoading",
      "error": "AsyncError",
      "delay": 200,
      "timeout": 3000
    }
  }
}
```
:::

## uni.scss
这个是全局的样式文件，官方预定了很多常用的样式规则和变量。

## package.json

在 web 和小程序添加一些依赖包，扩展其他的功能。

### vite.config.js

vue3 项目生成的配置文件。

## 全局组件

全局组件主要是内置组件和扩展组件。

## 内置组件

所有的视图组件，包括 view、swiper 等，本身不显示任何可视化元素，用途都是为了包裹其他真正显示的组件，可以直接在 vue 页面中使用。

常见有：

+ uniapp 组件
+ vue 组件
+ nvue 组件
+ 小程序组件

## 扩展组件

uni-ui 是 DCloud 提供的一个跨端 ui 库，它是基于 vue 组件的、flex 布局的、无 dom 的跨全端 ui 框架，不包括基础组件，它是基础组件的补充，有些组件需要到插件市场下载才可以使用。

常见有：

+ 列表组件
+ 表单组件
+ 表格组件
+ 加载更多组件
+ 自定义导航栏组件
+ 弹出层组件

## 常用 API

### 基础

+ onPageNotFound，页面不存在事件；
+ onError，错误事件；
+ onAppShow，页面前台事件；
+ onAppHide，页面后台事件；
+ addInterceptor，拦截器；

### 网络

+ request，发起请求；
+ uploadFile，上传文件；
+ downloadFile，下载文件；
+ connectSocket，创建一个 websocket 连接；
+ onSocketOpen，ws 打开事件；
+ onSocketError，错误事件；
+ sendSocketMessage，发送 ws 消息；
+ onSocketMessage，接收 ws 消息；
+ closeSocket，关闭 ws；
+ onSocketClose，监听关闭 ws；

### 页面路由

+ navigateTo，保留当前页面，跳转到其他页面；
+ redirectTo，关闭当前页面，跳转到其他页面；
+ reLaunch，关闭所有页面，跳转到其他页面；
+ switchTab，跳转到 tabBar 底部导航页面；
+ navigateBack，返回上一个页面或多级页面；

### 数据缓存

setStorage，将数据存储在本地缓存中的指定 key 中，覆盖原来该 key 的内容；
getStorage，从本地缓存中获取指定 key 的内容；
removeStorage，从本地缓存中移除指定 key 及内容；
clearStorage，清除本地缓存；
getStorageInfo，获取本地缓存信息；

### 界面

+ showToast，显示消息提示框；
+ hideToast，隐藏消息提示框；
+ showLoading，显示加载提示框；
+ hideLoading，隐藏加载提示框；
+ showModal，显示模态弹出框；
+ showActionSheet，从底部弹出操作菜单；
+ onPullDownRefresh，下拉刷新；
+ createSelectorQuery，节点信息；

### 文件

+ chooseImage，选择图片；
+ saveImageToPhotosAlbum，保存图片到相册；
+ chooseFile，选择文件；
+ saveFile，保存文件到本地；
+ removeSavedFile，删除本地保存的文件；
+ getSavedFileList，获取本地保存的文件列表；
+ getFileInfo，获取文件信息；
+ openDocument，新页面打开文档；

### 条件编译

**概念**

条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。

写法：以 `#ifdef` 或 `#ifndef` 加 `%PLATFORM%` 开头，以 `#endif` 结尾。

+ `#ifdef`：if defined 仅在某平台存在;
+ `#ifndef`：if not defined 除了某平台均存在;
+ `%PLATFORM%`：平台名称;

**%PLATFORM%值：**

以下是 UniApp 中 `%PLATFORM%` 的常见值及其对应平台的表格整理：  

| **平台变量**         | **对应平台**               | **说明**                              |
|----------------------|---------------------------|--------------------------------------|
| `H5`                 | Web 浏览器（HTML5）        | 运行在浏览器环境                     |
| `MP-WEIXIN`          | 微信小程序                | 微信平台的小程序                     |
| `MP-ALIPAY`          | 支付宝小程序              | 支付宝平台的小程序                   |
| `MP-BAIDU`           | 百度智能小程序            | 百度平台的小程序                     |
| `MP-TOUTIAO`         | 字节跳动小程序            | 抖音、今日头条等字节系小程序         |
| `MP-LARK`            | 飞书小程序                | 飞书平台的小程序                     |
| `MP-QQ`              | QQ 小程序                 | QQ 平台的小程序                      |
| `MP-KUAISHOU`        | 快手小程序                | 快手平台的小程序                     |
| `APP` / `APP-PLUS`   | 原生应用（Android/iOS）    | 通过 UniApp 打包成 APK 或 IPA        |
| `APP-PLUS-NVUE`      | 原生应用（NVue 页面）      | 使用 weex 原生渲染的页面             |
| `MP-360`             | 360 小程序                | 360 平台的小程序（较少使用）         |
| `QUICKAPP-WEBVIEW`   | 快应用（Webview 模式）     | 华为、小米等快应用联盟               |
| `QUICKAPP-WEBVIEW-UNION` | 快应用联盟            | 支持多厂商的快应用                   |

### **使用示例**
```javascript
// #ifdef H5
console.log("这段代码仅在 H5 环境执行");
// #endif

// #ifdef MP-WEIXIN
console.log("这段代码仅在微信小程序执行");
// #endif
```

### **注意事项**
1. **大小写敏感**：必须全大写（如 `MP-WEIXIN`，不能写成 `mp-weixin`）。  
2. **条件编译**：不同平台的代码会在编译时自动分离，减少包体积。  
3. **动态判断**：如需运行时判断，可使用 `uni.getSystemInfoSync().platform`，但条件编译更高效。  

如果需要更详细的平台支持或最新变动，建议参考 [UniApp 官方文档](https://uniapp.dcloud.io/)。

**支持的文件**

+ .vue、.pug
+ .css、.scss、.less、.stylus
+ .js、.ts
+ pages.json

## 写法

vue/nvue 模板里使用 `<!-- 注释 -->`，css 使用 /* 注释 */，js 使用 // 注释。

**模板写法**

```vue
<!--  #ifdef  %PLATFORM% -->
平台特有的组件
<!--  #endif -->

```

**css 样式写法**

```css
/*  #ifdef  %PLATFORM%  */
平台特有样式
/*  #endif  */

```

**JS 写法**

```js
// #ifdef  %PLATFORM%
平台特有的API实现;
// #endif
```

**pages.json**

```json
// #ifdef %PLATFORM%
{
  "pagePath": "pages/eg",
  "text": "案例"
}
// #endif

```

## 插件开发

[插件市场官网](https://ext.dcloud.net.cn/)

有数千款插件，支持前端组件、js sdk、页面模板、项目模板、原生插件等多种类型。在生态建设上远远领先于竞品。
请注意尽量在官方市场寻找插件，npm 等三方市场没有 uni-app 兼容性描述，很容易下载到无法跨平台的、仅适配 web 的插件。

**插件分类**

DCloud 插件市场将插件分为前端组件、JS SDK、uni-app 前端模板、App 原生插件、uniCloud 等 7 大类、20 多个子类。

**uni_modules**

uni_modules 是 uni-app 的插件模块化规范（HBuilderX 3.1.0+支持），通常是对一组 js sdk、组件、页面、uniCloud 云函数、公共模块等的封装，用于嵌入到 uni-app 项目中使用，也支持直接封装为项目模板。
