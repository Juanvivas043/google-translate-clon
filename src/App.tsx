import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon, ClipboardIcon } from './components/icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { SectionType } from './type.d'
import { useEffect } from 'react'
import { translate } from './services/translate.ts'
import { useDebouce } from './hooks/useDebounce.ts'

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

  const debounceFromText = useDebouce(fromText, 500)

  useEffect(() => {
    if (debounceFromText === '') return
    translate({text: debounceFromText, fromLanguage, toLanguage})
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('Error')})
  }, [debounceFromText, toLanguage, fromLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(()=>{})
  }

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
            <div style={{ position: 'relative'}}>
              <TextArea 
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}/>

              <Button 
              variant='link' 
              style={{ 
                position:'absolute',
                left:0,
                bottom:0}} 
              onClick={handleClipboard}>
                  <ClipboardIcon/>
              </Button>
            </div>

          </Stack>
        </Col>
        
      </Row>

    </Container>
    </>
  )
}

export default App
