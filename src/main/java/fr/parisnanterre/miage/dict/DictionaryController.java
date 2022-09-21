package fr.parisnanterre.miage.dict;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v01/dictionary")
public class DictionaryController {
    
    private final DictionaryService dictionaryService;

    @Autowired
    public DictionaryController(DictionaryService dictionaryService){
        this.dictionaryService = dictionaryService; 
    }

    @GetMapping
    public Dictionary getRandomWord() {
        return dictionaryService.getRandomWord();
    }
}

