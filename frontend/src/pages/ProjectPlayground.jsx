import { useParams } from "react-router-dom";
import EditorComponent from "../components/molecules/EditorComponent/EditorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";
import { useEffect } from "react";
import { useTreeStructureStore } from "../store/treeStructureStore";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { io } from 'socket.io-client';


export default function ProjectPlayground() {
    
    const {projectId: projectIdParam} = useParams();
    const {projectId, setProjectId} = useTreeStructureStore();
    const {setEditorSocket} = useEditorSocketStore();

    useEffect(() => {
        const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
            query: {
                projectId: projectIdParam
            }
        });

        setEditorSocket(editorSocketConn);
        setProjectId(projectIdParam);
    }, []);

    return (
    <>
        
        <div style={{display: 'flex', flexDirection: 'row'}}>
            { projectId && (
                <div
                    style={{
                        backgroundColor: '#333254',
                        paddingRight: '10px',
                        paddingTop: '0.3vh',
                        minWidth: '250px',
                        maxWidth: '25%',
                        height: '99.7vh',
                        overflow: 'auto',
                        // display: 'flex',
                        // flexDirection: 'row',
                        // justifyContent: 'space-between'
                    }}
                >
                    <TreeStructure/>
                </div>
            )}
            {/* <div>
            <div>
                <EditorButton isActive={true}/>
                <EditorButton />
            </div>
            </div> */}
            <EditorComponent/>
        </div>
        
    </>

    )
}