import React, { useState } from "react";

type appProps = {
    answerList: string[][];
    setAnswerList: React.Dispatch<React.SetStateAction<string[][]>>;
    setJudge: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
    rowcnt: number;
    setColumncnt: React.Dispatch<React.SetStateAction<number>>;
    columncnt: number;
    setRowcnt: React.Dispatch<React.SetStateAction<number>>;
    answerList: string[][];
    setAnswerList: React.Dispatch<React.SetStateAction<string[][]>>;
    keyLayout: string[];
    outputList: string[];
    setOutputList: React.Dispatch<React.SetStateAction<string[]>>;
    setJudge: React.Dispatch<React.SetStateAction<boolean>>;
};

const KeyboardRow = (props: Props) => {

    const updateAnswer = (output: string[]) => {
        let copyAnswer = Array.from(props.answerList);

        // outputを空文字埋め
        let tmpOutput = Array.from(output);
        for (let i=tmpOutput.length; i<=5; i++){
            tmpOutput.push("");
        }

        copyAnswer[props.rowcnt] = tmpOutput;
        props.setAnswerList(copyAnswer);
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const letter = event.currentTarget.value;
        let copyList: string[] = [...props.outputList, letter];

        // Enter入力
        if (letter == "Enter") {
            // 文字数不足
            if (copyList.length < 6){
                alert("文字数が足りません");
            }

            // 5文字入力した状態
            else {
                // AnswerListへの送信
                let insertList: string[][] = Array.from(props.answerList);
                insertList[props.rowcnt] = props.outputList
                props.setAnswerList(insertList);

                // Judge依頼
                props.setJudge(true);

                // outputの初期化
                props.setOutputList(new Array(0));

                // 次の行へ以降
                props.setRowcnt(props.rowcnt+1);
            }
        }

        // Delete入力
        else if(letter == "Delete"){

            // 1文字も入力していない（消す予定）
            if(copyList.length == 1){
                copyList.splice(copyList.length-1,1);
                props.setOutputList(copyList);
                updateAnswer(copyList);
            }

            // 1文字以上入力
            else{
                copyList.splice(copyList.length-2,2);
                props.setOutputList(copyList);
                updateAnswer(copyList);
            }
            
        } 

        // アルファベット入力
        else if (copyList.length < 6) {
            props.setOutputList(copyList);
            updateAnswer(copyList);
        }
    };

    // キーボードのCSSスタイル
    const keyboardStyle: React.CSSProperties = {
        borderSpacing: "6px 6px",
        display: "flex",
        justifyContent: "center"
    };

    // ボタンのCSSスタイル
    const buttonStyle: React.CSSProperties = {
        backgroundColor: "rgb(217, 217, 217)",
        borderRadius: "4px",
        border: "none",
        width: "45px",
        height: "60px",

        fontSize: "13px",
        fontWeight: "bold",
        cursor: "pointer"
    };

    return (
        // mapによりキーボードtable作成
        <table id="keyboard-row" style={keyboardStyle}>
        <tbody>
            <tr>
            {props.keyLayout.map((key, i) => (
                <td id="alphabet-key" key={i}>
                {/* ボタン */}
                <button value={key} onClick={handleClick} style={buttonStyle}>
                    {key}
                </button>
                </td>
            ))}
            </tr>
        </tbody>
        </table>
    );
};


export const Keyboard = (props: appProps) => {
    const upKeyLayout: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const middleKeyLayout: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const downKeyLayout: string[] = ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"];

    // const initList: string[] = new Array(5).fill("");
    const initList: string[] = new Array(0);
    const [outputList, setOutputList] = useState<string[]>(initList);

    const [rowcnt,setRowcnt] = useState(0);
    const [columncnt,setColumncnt] = useState(0);
    
    return (
        <div className="Keyboard">
        <KeyboardRow
            rowcnt={rowcnt}
            setRowcnt={setRowcnt}
            columncnt={columncnt}
            setColumncnt={setColumncnt}
            answerList={props.answerList}
            setAnswerList={props.setAnswerList}
            keyLayout={upKeyLayout}
            outputList={outputList}
            setOutputList={setOutputList}
            setJudge={props.setJudge}
        />
        <KeyboardRow
            rowcnt={rowcnt}
            setRowcnt={setRowcnt}
            columncnt={columncnt}
            setColumncnt={setColumncnt}
            answerList={props.answerList}
            setAnswerList={props.setAnswerList}
            keyLayout={middleKeyLayout}
            outputList={outputList}
            setOutputList={setOutputList}
            setJudge={props.setJudge}
        />
        <KeyboardRow
            rowcnt={rowcnt}
            setRowcnt={setRowcnt}
            columncnt={columncnt}
            setColumncnt={setColumncnt}
            answerList={props.answerList}
            setAnswerList={props.setAnswerList}
            keyLayout={downKeyLayout}
            outputList={outputList}
            setOutputList={setOutputList}
            setJudge={props.setJudge}
        />
        </div>
    );
};
