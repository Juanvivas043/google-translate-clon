import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore.ts'
import { AUTO_LANGUAGE } from './constants.ts'
import { ArrowsIcon } from './components/icons.tsx'
import { LanguageSelector } from './components/LanguageSelector.tsx'

function App() {

  const { fromLanguage, toLanguage, setFromLanguage, setToLanguage, interchangeLanguage } = useStore()

  return (
    <>
    <Container fluid>

      <h1>Google Translate</h1>

      <Row>
        <Col>
          <LanguageSelector 
          type='from'
          value={fromLanguage}
          onChange={setFromLanguage}/>
        </Col>

        <Col>
          <Button
          variant='link'
          disabled={fromLanguage  === AUTO_LANGUAGE}
          onClick={interchangeLanguage}
          ><ArrowsIcon/></Button>
        </Col>

        <Col>
          <LanguageSelector 
          type='to'
          value={toLanguage}
          onChange={setToLanguage}/>
        </Col>
      </Row>

    </Container>
    </>
  )
}

export default App
