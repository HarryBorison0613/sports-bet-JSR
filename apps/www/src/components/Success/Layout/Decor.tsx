import {
    WhitePolygon,
    GreenPolygon,
    GreyPolygon,
  } from "src/components/Success/Layout/Icons";
export default function Decor() {
    return (
        <>
            <p style={{position:'absolute', fontStyle: 'normal',fontWeight: 400,lineHeight: '20px',}} className={"polygonClass1"}>
            {<WhitePolygon />}  1.346
            </p>

            <p style={{position:'absolute', fontStyle: 'normal',fontWeight: 400,lineHeight: '20px',}} className={"polygonClass2"}>
            {<GreyPolygon />}  2.346
            </p>

            <p style={{position:'absolute', fontStyle: 'normal',fontWeight: 400,lineHeight: '20px',}} className={"polygonClass3"}>
            {<GreenPolygon />}  0.846
            </p>

            <p style={{position:'absolute', fontStyle: 'normal',fontWeight: 400,lineHeight: '20px',}} className={"polygonClass4"}>
            {<WhitePolygon />}  0.456
            </p>

            <p style={{position:'absolute', fontStyle: 'normal',fontWeight: 400,lineHeight: '20px',}} className={"polygonClass5"}>
            {<WhitePolygon />}  1.879
            </p>

            <p style={{position:'absolute', fontStyle: 'normal',fontWeight: 400,lineHeight: '20px',}} className={"polygonClass6"}>
            {<GreenPolygon />}  3.346
            </p>

            <p style={{position:'absolute', fontStyle: 'normal',fontWeight: 400,lineHeight: '20px',}} className={"polygonClass7"}>
            {<WhitePolygon />}  0.898
            </p>

            <p style={{position:'absolute', fontStyle: 'normal',fontWeight: 400,lineHeight: '20px',}} className={"polygonClass8"}>
            {<GreyPolygon />}  1.346
            </p>
     

        </>
    )
}