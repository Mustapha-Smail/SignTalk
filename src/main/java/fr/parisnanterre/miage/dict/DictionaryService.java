package fr.parisnanterre.miage.dict;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DictionaryService {
    public final DictionaryRepository dictionaryRepository;

    @Autowired
    public DictionaryService(DictionaryRepository dictionaryRepository){
        this.dictionaryRepository = dictionaryRepository; 
    }

    List<Dictionary> getRandomWord() {
        return dictionaryRepository.findAll();  
    }

}
