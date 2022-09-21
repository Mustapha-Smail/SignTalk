// package fr.parisnanterre.miage.dict;

// import java.util.List;

// import org.springframework.boot.CommandLineRunner;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// @Configuration
// public class DictionaryConfig {
    
//     @Bean
//     CommandLineRunner commandLineRunner(DictionaryRepository repository){
//         return args -> {
//             Dictionary word = new Dictionary(
//                 "Bonjour", 
//                 "https://cdn.lepetitjournal.net/uploads/2020/10/lsf.jpg"
//             ); 
//             Dictionary anotherword = new Dictionary(
//                 "Hello", 
//                 "https://cdn.lepetitjournal.net/uploads/2020/10/lsf.jpg"
//             ); 
//             repository.saveAll(List.of(word, anotherword)); 
//         }; 

//     }
// }
