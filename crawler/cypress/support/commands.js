import dayjs from 'dayjs';

//
Cypress.on('uncaught:exception', (err, runnable) => {

    // returning false here prevents Cypress from
    // failing the test
    return false

});

// 人事系統登入 (震旦行)
Cypress.Commands.add('hrLogin', () => {

    const config = {
        url: 'https://moonshine-login.aoacloud.com.tw/Home/DeskAuthIndex',
        account: 'bliang.tw',
        password: 'xiahfrog520',
    };

    cy.visit(config.url);

    // 輸入帳密
    cy.get('input[name="login_name"]').type(config.account);
    cy.get('input[name="password"]').type(config.password);
    cy.get('input#loginBtn').click();

});

// 取當前頁面資料
Cypress.Commands.add('handleCollectData', ($elem) => {

    const $row = $elem.get(0);
    const $cell = $row.cells;
    const col0 = $cell[4].innerText.split(' - ');

    return {
        date: dayjs($cell[2].innerText.split('(')[0]).format('YYYY-MM-DD'),
        department: $cell[3].innerText,
        userId: col0[0],
        name: col0[1],
        workTimeStart: $cell[7].innerText.trim(),
        workTimeEnd: $cell[8].innerText.trim(),
        realWorkHour: +$cell[10].innerText, // 實到工時
        leaveHour: +$cell[14].innerText,
        absentHour: +$cell[11].innerText, // 曠職
        overtimeHour: +$cell[16].innerText, // 週末加班
        notes: $cell[18].innerText.trim(), // 差勤紀錄
    };

});

// 判斷每月或每日
Cypress.Commands.add('handleRangeDate', (type = 'today') => {

    const today = dayjs();
    const start = dayjs((type === 'today') ? today : dayjs().subtract(1, 'month').startOf('month')).format('YYYY-MM-DD');
    const end = dayjs((type === 'today') ? today : dayjs().subtract(1, 'month').endOf('month')).format('YYYY-MM-DD');

    cy.get('[name="ctl00$MainContent$txtAttendDate1"]')
        .clear()
        .type(start);

    cy.get('[name="ctl00$MainContent$txtAttendDate2"]')
        .clear()
        .type(end);

});

// 打 ajax
Cypress.Commands.add('ajax', (url, params, callback) => {

    cy.request('POST', `/api/v1/${url}`, params)
        .then(() => {

            if (callback) callback();

        });

});
