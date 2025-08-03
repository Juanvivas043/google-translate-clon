import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { API_SUPPORTED_LANGUAGES, AUTO_LANGUAGE } from './constants'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/icons'
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

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = API_SUPPORTED_LANGUAGES[toLanguage]
    utterance.rate = 0.85
    speechSynthesis.speak(utterance)
  }

  return (
    <>
    <Container fluid>

      <h1>Juan Translate</h1>

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
              <div style={{ position:'absolute', left:0, bottom:0}}>
                <Button 
                variant='link' 
                onClick={handleClipboard}>
                  <ClipboardIcon/>
                </Button>

                <Button 
                variant='link' 
                onClick={handleSpeak}>
                  <SpeakerIcon/>
                </Button>
              </div>
            </div>

          </Stack>
        </Col>
        
      </Row>

    </Container>
    </>
  )
}

export default App
