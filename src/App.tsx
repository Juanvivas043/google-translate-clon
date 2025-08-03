import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon } from './components/icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { SectionType } from './type.ts'
import { useEffect } from 'react'
import { translate } from './services/translate.ts'

function App() {

  const { 
    loading, 
    fromLanguage,
    toLanguage, 
    fromText, 
    result, 
    setFromLanguage, 
    setToLanguage, 
    setFromTextLanguage, 
    setResult, 
    interchangeLanguage } = useStore()

  useEffect(() => {
    if (fromText === '') return
    translate({text: fromText, fromLanguage, toLanguage})
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('Error')})
  }, [fromText, toLanguage, fromLanguage])

  return (
    <>
    <Container fluid>

      <h1>Google Translate</h1>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector 
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage}/>

            <TextArea
            type={SectionType.From}
            value={fromText}
            onChange={setFromTextLanguage}/>
          </Stack>
        </Col>

        <Col>
          <Button
          variant='link'
          disabled={fromLanguage  === AUTO_LANGUAGE}
          onClick={interchangeLanguage}
          ><ArrowsIcon/></Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector 
            type={SectionType.To}
            value={toLanguage}
            onChange={setToLanguage}/>

            <TextArea 
              loading={loading}
              type={SectionType.To}
              value={result}
              onChange={setResult}/>
          </Stack>
        </Col>
        
      </Row>

    </Container>
    </>
  )
}

export default App
