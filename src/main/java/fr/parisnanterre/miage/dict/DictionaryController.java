package fr.parisnanterre.miage.dict;

import java.util.List;
// import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v01/dictionary")
public class DictionaryController {
    
    private final DictionaryService dictionaryService;

    @Autowired
    public DictionaryController(DictionaryService dictionaryService){
        this.dictionaryService = dictionaryService; 
    }

    @GetMapping
    public List<Dictionary> getRandomWord() {
        return dictionaryService.getRandomWord();
    }
}

