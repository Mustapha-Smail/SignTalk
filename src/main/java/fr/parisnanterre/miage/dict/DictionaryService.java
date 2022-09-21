package fr.parisnanterre.miage.dict;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DictionaryService {
    public final DictionaryRepository dictionaryRepository;

    @Autowired
    public DictionaryService(DictionaryRepository dictionaryRepository){
        this.dictionaryRepository = dictionaryRepository; 
    }

    Dictionary getRandomWord() {
        Random rand = new Random(); 
        List<Dictionary> words = dictionaryRepository.findAll();  
        
        Dictionary randomWord = words.get(rand.nextInt(words.size()));

        return randomWord;  
    }

}
