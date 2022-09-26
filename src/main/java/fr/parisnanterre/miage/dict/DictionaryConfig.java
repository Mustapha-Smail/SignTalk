package fr.parisnanterre.miage.dict;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DictionaryConfig {
    
    @Bean
    CommandLineRunner commandLineRunner(DictionaryRepository repository){
        return args -> {
            Dictionary A = new Dictionary(
                "A", 
                "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LSF_LettreA.jpg/120px-LSF_LettreA.jpg"
            );
            Dictionary B = new Dictionary(
                "B", 
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LSF_LettreB.jpg/90px-LSF_LettreB.jpg"
            );
            Dictionary C = new Dictionary(
                "C", 
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/LSF_LettreC.jpg/120px-LSF_LettreC.jpg"
            );
            Dictionary D = new Dictionary(
                "D", 
                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/LSF_LettreD.jpg/120px-LSF_LettreD.jpg"
            );
            Dictionary E = new Dictionary(
                "E", 
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/LSF_LettreE.jpg/120px-LSF_LettreE.jpg"
            );
            repository.saveAll(List.of(A,B,C,D,E)); 
        }; 

    }
}
