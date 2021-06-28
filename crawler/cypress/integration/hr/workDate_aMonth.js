const ms = 10000;

describe('人事系統', () => {

    beforeEach(() => cy.hrLogin());

    it('每月出勤', () => {

        cy.get('#hr').click();
        cy.get('#menu #hr :nth-last-child(2) a').click();
        cy.get('.search-choice-close').click();

        // test
        // click department
        // cy.get('#MainContent_OrgCtrl_org1_chosen .chosen-choices').click();
        // cy.get('li[data-option-array-index="16"]').click();

        // 控制出勤日期
        cy.handleRangeDate('month');

        cy.get('.toolbar #MainContent_btnSearch').click();

        // 分頁事件
        cy.get('#MainContent_ASPxGridView1_DXPagerBottom_PSB').click();
        cy.get('#MainContent_ASPxGridView1_DXPagerBottom_PSP_DXI3_T').click();

        // 等待分頁按完後才做下一步
        cy.wait(ms);

        // init: 一開始進入此頁面要先撈一次當夜資料
        handleData([]);

        // 分頁觸發
        cy.get('#MainContent_ASPxGridView1_DXPagerBottom')
            .then((page) => {

                const totalPage = page.find('.dxp-num').last().text();

                // 依據總頁碼跑回圈執行點擊
                for (let index = 0; index < totalPage - 1; index++) {

                    cy.get('img.dxWeb_pNext_Metropolis')
                        .parent()
                        .click()
                        .then(() => cy.wait(ms));

                    // 整理資料
                    handleData([]);

                }

            });

        // 資料收集
        function handleData (array) {

            cy.get('#MainContent_ASPxGridView1_DXMainTable tr.dxgvDataRow_Metropolis').each(($elem, idx) => {

                // form command
                cy.handleCollectData($elem)
                    .then((obj) => array.push(obj));

            });

            cy.log('array:', array);
            cy.ajax('createWorkData', array);

        }

    });

});

/**
 * https://www.webtips.dev/turning-e2e-tests-into-web-scraping
 * https://www.analyticsvidhya.com/blog/2020/12/web-scraping-using-cypress-tool
 */
