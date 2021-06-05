// This will pull data from any google sheet using https://www.npmjs.com/package/drive-db
// See https://www.youtube.com/watch?v=6AbjKgpwQQM
// It works great, but is absolutely view only, and it can't query
// TODO: Set up a sheet with only the needed data so that this can display it
// TODO: Is there a way to create different views and require a login for each view?

import React, {useState, useEffect} from 'react';
import drive from 'drive-db';
import './TestPull.css';

function TestPull(){
    const [testData, setTestData] = useState([]);

    const SheetId = '1EM91owgej5GxUNHayBrcC2cFCnZljJSaYP1Yt72zbBo';
    // Create an async context to be able to call `await`
    useEffect(() => {
        const getData = async () => {
            // Load the data from the Drive Spreadsheet
            const response = await drive({
                sheet: SheetId,
                tab: '1', // each tab should have already queried the needed data so only that data will come back
            });

            setTestData(response);
            /* console.log(response); */
        };
    
        getData();

    }, []);

    const displayListItems = testData.map(
        (row, i) => (
            <div>
                <p>
                    <span key={row.firstname}>{'Judge: ' + row.firstname + ' ' + row.lastname}</span>
                </p>
                <p>
                    <span key={row.defenseteamcode}>{row.defenseteamcode + ': ' + row.defensetotal}</span>
                </p>
            </div>
        )
    );

    // ******************************************
    // use this to determine what link to display
    const t1 = new Date("Feb 16, 2021 10:00:00");
    const t2 = Date.now();
    const whatTimeIsIt = t1 > t2
        ? <a key={1} href='https://www.google.com/'>Google</a>
        : <a key={2} href='https://duckduckgo.com/'>DuckDuckGo</a>;
    
    /* console.log(whatTimeIsIt); */
    // *****************************************
    

    const DisplayList = () => {
        return (
            <div>
                {displayListItems}
            </div>
        );
    };

    return (
        <div className='test-pull'>
            <h2>This is a test</h2>
            <p>Display the dashboard link here, depending on what date/time it is</p>
            <p>If it is currently earlier than Monday, Feb 15, 2021 at 10am, this will show a link to Google.</p>
            <p>If it is currently later than Monday, Feb 15, 2021 at 10am, this will show a link to DuckDuckGo.</p>
            {whatTimeIsIt}
            <DisplayList />
        </div>
    );
}

export default TestPull;