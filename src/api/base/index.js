import getData from '@/utils/axios.js'

const { $get, $post, $put } = new getData

// USER

/**
 * 注册
 * @param {Object} params 参数对象，包括：
 *        username          {String} 用户名
 *        email             {String} 邮箱
 *        password1         {String} 密码
 *        password2         {String} 确认密码
 */
export const registration = function (params) {
    return $post('/rest-auth/registration/', params)
}

/**
 * 登录
 * @param {Object} params 参数对象，包括：
 *        username          {String} 用户名
 *        password          {String} 密码
 */
export const tokenAuth = function (params) {
    return $post('/api/v2/api-token-auth/', params)
}

/**
 * 获取用户详细信息eg:userName,Email
 */
export const getUser = function () {
    return $get('/rest-auth/user/')
}

/**
 * 城市合伙人详细信息
 * @param {Object} params 参数对象，包括：
 *        first_name                    {String} 名字
 *        last_name                     {String} 姓
 *        gender                        {String} 性别
 *        birthdate                     {String} 出生日期
 *        country_of_residence          {String} 住址
 *        occupation                    {String} 行业
 *        country_calling_code          {String} 区号
 *        telephone_no                  {String} 手机号
 *        wechat                        {String} 微信
 */
export const ambassadorDetai = function (params) {
    return $post('/ambassador/detai/', params)
}

/**
 * 城市合伙人详细信息获取
 */
export const getAmbassadorDetai = function () {
    return $get('/ambassador/detai/')
}

/**
 * 城市合伙人修改
 * @param {Object} params 参数对象，包括：
 *        first_name                    {String} 名字
 *        last_name                     {String} 姓
 *        gender                        {String} 性别
 *        birthdate                     {String} 出生日期
 *        country_of_residence          {String} 住址
 *        occupation                    {String} 行业
 *        country_calling_code          {String} 区号
 *        telephone_no                  {String} 手机号
 *        wechat                        {String} 微信
 */
export const PutAmbassadorDetai = function (params) {
    return $put('/ambassador/detai/', params)
}


/**
 * 城市合伙人 url 和qrcode
 */
export const ambassadorShare = function () {
    return $get('/ambassador/share/')
}

/**
 * 城市合伙人账号信息提交
 * @param {Object} params 参数对象，包括：
 *        paypal_email                    {String} paypal邮箱
 *        beneficiary_name                {String} Debit姓名
 *        beneficiary_address             {String} Debit住址
 *        beneficiary_bank_name           {String} Debit银行名称
 *        beneficiary_bank_address        {String} Debit银行地址
 *        swift_code                      {String} swift_code
 *        iban                            {String} iban
 *        default_account                 {String} 默认账号
 */
export const ambassadorAccount = function (params) {
    return $post('/ambassador/account/', params)
}

/**
 * 城市合伙人账号信息获取
 */
export const getAmbassadorAccount = function () {
    return $get('/ambassador/account/')
}

/**
 * 城市合伙人账号信息修改
 * @param {Object} params 参数对象，包括：
 *        paypal_email                    {String} paypal邮箱
 *        beneficiary_name                {String} Debit姓名
 *        beneficiary_address             {String} Debit住址
 *        beneficiary_bank_name           {String} Debit银行名称
 *        beneficiary_bank_address        {String} Debit银行地址
 *        swift_code                      {String} swift_code
 *        iban                            {String} iban
 *        default_account                 {String} 默认账号
 */
export const PutAmbassadorAccount = function (params) {
    return $put('/ambassador/account/', params)
}

/**
 * 城市合伙人信息列表
 * @param {Object} params 参数对象，包括：
 *        start_time                    {String} 起始时间
 *        end_time                      {String} 结束时间
 *        page                          {String} 当前页
 */
export const getAmbassadorInvitations = function (params) {
    return $get('/ambassador/invitations/', params)
}
